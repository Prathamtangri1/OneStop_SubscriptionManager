import atexit
from apscheduler.scheduler import Scheduler
from flask import request
import flask
import csv
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
home_dir = '/home/......'
subs_data_file = home_dir+'subs_data.csv'
AUTO_DB_DATA_REFRESH = False

# ! Warning !  -   Backend Server won't run, if kept true
MANUAL_DB_DATA_REFREH = False

# Authentication Keys
user_id = '<>'
password = '<>'
cert = home_dir+'cert.pem'
key = home_dir+'key_<>.pem'

# MLE (Message Level Encryption) Keys
keyId = '<>'
encryption_public_key_path = home_dir + \
    'server_cert_<>.pem'
decryption_private_key_path = home_dir + \
    'key_<>.pem'

# DB Configs
dbHost = "localhost"
dbUser = "<>"
dbPw = "<>"
dbName = "<>"

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


def fetchOffersAndInsert():
    response, err = httpGet("https://sandbox.api.visa.com/vmorc/offers/v1/all")
    if err != None:
        print(err)
        return
    assert str(response.status_code) == '200', "API CALL FAILED"
    if DEBUG:
        print("\n\nResponse Header : \n", response.headers)

    merchants = {1: "HBO Now", 2: "Magzter",
                 3: "Amazon Prime", 14: "Spotify", 15: "Netflix"}
    response_json = bToJson(response.content)

    mydb = initDb()
    # Truncate the Offers Table
    mycursor = mydb.cursor()
    sql = "TRUNCATE table offersTable;"
    mycursor.execute(sql)
    mydb.commit()

    for offer in response_json["Offers"]:
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

            # Insert latest Data
            mycursor2 = mydb.cursor()
            sql = "INSERT INTO offersTable (offerId, merchantName, offerTitle, offerShortDesc, offerLongDesc, validFrom, validTo, visaTerms, merchantTerms, redemptionCode, redemptionUrl, cardProductList, cardPaymentTypeList) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (offerId, merchantName, offerTitle, offerShortDesc, offerLongDesc, validFrom, validTo,
                   visaTerms, merchantTerms, redemptionCode, redemptionUrl, cardProductList, cardPaymentTypeList)
            mycursor2.execute(sql, val)
            mydb.commit()
            print(mycursor2.rowcount, "record inserted.")


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


def populateSubscriptionData():

    # Truncate the Offers Table
    mydb = initDb()
    mycursor = mydb.cursor()
    sql = "TRUNCATE table tnxTable;"
    mycursor.execute(sql)
    mydb.commit()

    convert_col_to_int = [0, 3, 6, 7]
    with open(subs_data_file) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            line_count += 1
            for i in range(len(row)):
                if i in convert_col_to_int:
                    row[i] = int(row[i])

            # Insert tnx in DBs
            mycursor = mydb.cursor()
            sql = "INSERT INTO tnxTable (tnxId, merchantName , tnxDate , tnxAmt , tnxPAN , category , active , validityDays) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            values = tuple(row)
            mycursor.execute(sql, values)
            mydb.commit()
            print(mycursor.rowcount, "record inserted.")

# ----------------------------- Methods />-----------------------------


def allTnxD():
    headers = ["tnxId", "merchantName", "tnxDate", "tnxAmt",
               "tnxPAN", "category", "active", "validityDays"]
    mydb = initDb()
    mycursor = mydb.cursor()
    sql = "SELECT * from tnxTable;"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    tnxs = {"count": 0, "transactions": []}

    for x in myresult:
        tnx = {}
        for i in range(len(x)):
            tnx[headers[i]] = x[i]
        tnx["tnxDate"] = tnx["tnxDate"].strftime('%d-%m-%Y')
        tnxs["transactions"].append(tnx)
        tnxs["count"] += 1

    print(tnxs)
    with open("sample.json", "w") as outfile:
        json.dump(tnxs, outfile)


def allOffersD():
    headers = ["offerId", "merchantName", "offerTitle", "offerShortDesc",
               "offerLongDesc", "validFrom", "validTo", "visaTerms", "merchantTerms", "redemptionCode", "redemptionUrl", "cardProductList", "cardPaymentTypeList"]
    mydb = initDb()
    mycursor = mydb.cursor()
    sql = "SELECT * from offersTable;"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    offers = {"count": 0, "offers": []}

    for x in myresult:
        offer = {}
        for i in range(len(x)):
            offer[headers[i]] = x[i]
        offer["validFrom"] = offer["validFrom"].strftime('%d-%m-%Y')
        offer["validTo"] = offer["validTo"].strftime('%d-%m-%Y')
        offers["offers"].append(offer)
        offers["count"] += 1

    print(offers)
    with open("sample.json", "w") as outfile:
        json.dump(offers, outfile)


# -----------------------------</ Main -----------------------------

app = flask.Flask(__name__)

# Cron Scheduler for Refreshing the DB data
if AUTO_DB_DATA_REFRESH:
    cron = Scheduler(daemon=True)
    cron.start()

    @cron.interval_schedule(minutes=1)
    def job_function():
        populateSubscriptionData()
        fetchOffersAndInsert()

    # Shutdown your cron thread if the web process is stopped
    atexit.register(lambda: cron.shutdown(wait=False))


if __name__ == "__main__":
    if MANUAL_DB_DATA_REFREH:
        populateSubscriptionData()
        fetchOffersAndInsert()
        exit()
    app.config["DEBUG"] = True

    @app.route('/allTnx', methods=['GET'])
    def allTnx():
        headers = ["tnxId", "merchantName", "tnxDate", "tnxAmt",
                   "tnxPAN", "category", "active", "validityDays"]
        mydb = initDb()
        mycursor = mydb.cursor()
        sql = "SELECT * from tnxTable;"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        tnxs = {"count": 0, "transactions": []}

        for x in myresult:
            tnx = {}
            for i in range(len(x)):
                tnx[headers[i]] = x[i]
            tnx["tnxDate"] = tnx["tnxDate"].strftime('%d-%m-%Y')
            tnxs["transactions"].append(tnx)
            tnxs["count"] += 1
        response = app.response_class(
            response=json.dumps(tnxs),
            status=200,
            mimetype='application/json'
        )
        return response

    @app.route('/allOffers', methods=['GET'])
    def allOffers():
        headers = ["offerId", "merchantName", "offerTitle", "offerShortDesc",
                   "offerLongDesc", "validFrom", "validTo", "visaTerms", "merchantTerms", "redemptionCode", "redemptionUrl", "cardProductList", "cardPaymentTypeList"]
        mydb = initDb()
        mycursor = mydb.cursor()
        sql = "SELECT * from offersTable;"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        offers = {"count": 0, "offers": []}

        for x in myresult:
            offer = {}
            for i in range(len(x)):
                offer[headers[i]] = x[i]
            offer["validFrom"] = offer["validFrom"].strftime('%d-%m-%Y')
            offer["validTo"] = offer["validTo"].strftime('%d-%m-%Y')
            offers["offers"].append(offer)
            offers["count"] += 1

        response = app.response_class(
            response=json.dumps(offers),
            status=200,
            mimetype='application/json'
        )
        return response
    app.run()

# ----------------------------- Main />-----------------------------
