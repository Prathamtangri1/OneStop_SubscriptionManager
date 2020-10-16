import datetime
import json
import logging
import requests
import time
from jwcrypto import jwk, jwe

# Configurations and Keys
home_dir = '<SECRET>'

# Authentication Keys
user_id = '<SECRET>'
password = '<SECRET>'
cert = home_dir+'<SECRET>'
key = home_dir+'<SECRET>'

# MLE (Message Level Encryption) Keys
keyId = '<SECRET>'
encryption_public_key_path = home_dir + \
    '<SECRET>'
decryption_private_key_path = home_dir + \
    '<SECRET>'

# DEBUG MODE
DEBUG = True


def loadPem(filePath):
    with open(filePath, "rb") as pemfile:
        return jwk.JWK.from_pem(pemfile.read())


def encrypt(payload):
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


def decrypt(encPayload):
    encPayload = encPayload.decode("utf-8")
    if type(encPayload) is str:
        payload = json.loads(encPayload)
    if payload.get('encData', False):
        jwetoken = jwe.JWE()
        jwetoken.deserialize(payload["encData"], key=loadPem(
            decryption_private_key_path))
        return jwetoken.payload
    return encPayload

# DEBUG = False


# These two lines enable debugging at httplib level (requests->urllib3->http.client)
# You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.
# The only thing missing will be the response.body which is not logged.
try:
    import http.client as http_client
except ImportError:
    # Python 2
    import httplib as http_client
http_client.HTTPSConnection.debuglevel = 0

# Logging - You must initialize logging, otherwise you'll not see debug output.
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True

print("\nSTART\n")

print("TimeStamp : ", datetime.datetime.now())
date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

# API endpoint
url = 'https://sandbox.api.visa.com/cofds-web/v1/datainfo'

# Header with KeyId for MLE
headers = {'keyId': '<SECRET>'}
body = {}

# JSON Request Paylod for POST
payload = json.loads('''{
"requestHeader": {
"requestMessageId": "6da6b8b024532a2e0eacb1af58581",
"messageDateTime": "2019-02-35 05:25:12.327"
},
"requestData": {
"pANs": [
4072208010000000
],
"group": "STANDARD"
}
}
''')

timeout = 10
try:
    response = requests.post(url,
                             # verify = ('put the CA certificate pem file path here'),
                             cert=(cert, key),
                             headers=headers,
                             auth=(user_id, password),
                             # data = body,
                             json=encrypt(payload),
                             timeout=timeout
                             # if DEBUG: print (response.text)
                             )
except Exception as e:
    print(e)

if DEBUG:
    print("\n\nResponse Header : \n", response.headers)
if DEBUG:
    print("\n\nResponse Content : \n", decrypt(response.content))

var1 = str(response.status_code)
var2 = '200'
msg = " API call FAILED "
assert var1 == var2, msg
print("\n\nEND")

