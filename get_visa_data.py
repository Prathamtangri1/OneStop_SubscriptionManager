import mysql.connector
import datetime
import json
import logging
import requests
import time
import re
from jwcrypto import jwk, jwe


def setDebug():
    # These two lines enable debugging at httplib level (requests->urllib3->http.client)
    # You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.
    # The only thing missing will be the response.body which is not logged.
    try:
        import http.client as http_client
    except ImportError:
        # Python 2
        import httplib as http_client
    http_client.HTTPSConnection.debuglevel = 0
    return True


# -----------------------------</ Configurations -----------------------------
# Configurations and Keys
home_dir = '/home/candyzack/Desktop/VISA Project/oneStop3-keys/oneStopOffer/'

# Authentication Keys
user_id = ''
password = ''
cert = home_dir+'cert.pem'
key = home_dir+'key_5e9.pem'

# MLE (Message Level Encryption) Keys
keyId = '45c0d1'
encryption_public_key_path = home_dir + \
    'server_cert_45c0d.pem'
decryption_private_key_path = home_dir + \
    'key_45c0d16e-1.pem'

# DB Configs
dbHost = "localhost"
dbUser = "zack"
dbPw = ""
dbName = "main_db"

# DEBUG MODE
DEBUG = setDebug()


# Logging - You must initialize logging, otherwise you'll not see debug output.
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True
# ----------------------------- Configurations />-----------------------------


# -----------------------------</ Functions Definition ------------------------

def loadPem(filePath):
    with open(filePath, "rb") as pemfile:
        return jwk.JWK.from_pem(pemfile.read())


def bToJson(bContent, decrypt=False):
    content = decryptPayload(bContent) if decrypt else bContent
    return json.loads(content.decode("utf-8"))


def encryptPayload(payload):
    payload = json.dumps(payload)
    protected_header = {
        "alg": "RSA-OAEP-256",
        "enc": "A128GCM",
        "kid": keyId,
        "iat": int(round(time.time() * 1000))
    }
    jwetoken = jwe.JWE(payload.encode('utf-8'),
                       recipient=loadPem(
                           encryption_public_key_path),
                       protected=protected_header)
    encryptedPayload = jwetoken.serialize(compact=True)
    return {"encData": encryptedPayload}


def decryptPayload(encPayload):
    encPayload = encPayload.decode("utf-8")
    if type(encPayload) is str:
        payload = json.loads(encPayload)
    if payload.get('encData', False):
        jwetoken = jwe.JWE()
        jwetoken.deserialize(payload["encData"], key=loadPem(
            decryption_private_key_path))
        return jwetoken.payload
    return encPayload


def httpPost(headers, payload, url, encrypt=False):
    try:
        if encrypt:
            payload = encryptPayload(payload)
        response = requests.post(url,
                                 # verify = ('put the CA certificate pem file path here'),
                                 cert=(cert, key),
                                 headers=headers,
                                 auth=(user_id, password),
                                 # data = body
                                 json=payload,
                                 timeout=10
                                 )
        return response, None
    except Exception as e:
        return "", e


def httpGet(url):
    try:
        response = requests.get(url,
                                # verify = ('put the CA certificate pem file path here'),
                                cert=(cert, key),
                                auth=(user_id, password),
                                # data = body
                                # json=payload,
                                timeout=10
                                )
        return response, None
    except Exception as e:
        return "", e


def initDb():
    return mysql.connector.connect(
        host=dbHost,
        user=dbUser,
        password=dbPw,
        database=dbName
    )

# ----------------------------- Functions Definition />------------------------

# -----------------------------</ Methods -----------------------------


def OffersDBInserts():
    response, err = httpGet("https://sandbox.api.visa.com/vmorc/offers/v1/all")
    if err != None:
        print(err)
        return
    assert str(response.status_code) == '200', "API CALL FAILED"
    if DEBUG:
        print("\n\nResponse Header : \n", response.headers)

    mydb = initDb()
    merchants = {1: "Indiamags", 2: "magzter",
                 3: "Amazon Prime", 14: "Spotify", 15: "Netflix"}
    for offer in response.content["Offers"]:
        if offer["indexNumber"] in [1, 2, 3, 14, 15]:
            offerId = offer["indexNumber"]
            merchantName = merchants[offerId]
            offerTitle = offer["offerTitle"]
            offerShortDesc = offer["offerShortDescription"]["text"]
            validFrom = "2020-05-10"
            validTo = "2020-12-10"
            offerLongDesc = offer["offerCopy"]["text"][:100]
            visaTerms = offer["visaTerms"]["text"]
            merchantTerms = offer["merchantTerms"]["text"]
            redemptionCode = offer["redemptionCode"]
            redemptionUrl = offer["redemptionUrl"]
            cardProductList = []
            for i in offer["cardProductList"]:
                cardProductList.append(i["value"])
            cardProductList = ','.join(cardProductList)
            cardPaymentTypeList = []
            for i in offer["cardPaymentTypeList"]:
                cardPaymentTypeList.append(i["value"])
            cardPaymentTypeList = ','.join(cardPaymentTypeList)

            mycursor = mydb.cursor()

            # Truncate the Offers Table
            sql = "TRUNCATE table offers_table;"
            mycursor.execute(sql)
            sql = "INSERT INTO offers_table (offerId, merchantName, offerTitle, offerShortDesc, offerLongDesc, validFrom, validTo, visaTerms, merchantTerms, redemptionCode, redemptionUrl, cardProductList, cardPaymentTypeList) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            mycursor.execute(sql, val)

            val = (offerId, merchantName, offerTitle, offerShortDesc, offerLongDesc, validFrom, validTo,
                   visaTerms, merchantTerms, redemptionCode, redemptionUrl, cardProductList, cardPaymentTypeList)

            mydb.commit()
            print(mycursor.rowcount, "record inserted.")


def helloWorld():
    url = "https://sandbox.api.visa.com/vdp/helloworld"
    response, err = httpGet(url)
    if err != None:
        print(err)
        return

    assert str(response.status_code) == '200', "API CALL FAILED"
    if DEBUG:
        print("\n\nResponse Header : \n", response.headers)
    print(bToJson(response.content))


def recurringTnx():
    url = 'https://sandbox.api.visa.com/vsps/eligibleTransactions'
    headers = {'keyId': keyId}
    payload = json.loads('''{
        "range": 30,
        "pan": "4111111111111111",
        "startDate": "2020-01-20"
    }''')
    response, err = httpPost(headers, payload, url, encrypt=True)
    if err != None:
        print(err)
        return

    assert str(response.status_code) == '200', "API CALL FAILED"
    if DEBUG:
        print("\n\nResponse Header : \n", response.headers)
    print(bToJson(response.content, decrypt=True))

# ----------------------------- Methods />-----------------------------

# -----------------------------</ Main -----------------------------


if __name__ == "__main__":
    recurringTnx()
    helloWorld()

# ----------------------------- Main />-----------------------------
