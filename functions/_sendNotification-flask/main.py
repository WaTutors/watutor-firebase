# iOS
from time import time
import jwt
from hyper import HTTPConnection
import json
from google.cloud import secretmanager

# Android
import requests
import firebase_admin

app = firebase_admin.initialize_app()
secret_client = secretmanager.SecretManagerServiceClient()

apns_key = secret_client.access_secret_version(
    f"projects/wa-tutors/secrets/apns-key/versions/latest"
).payload.data.decode()


def dispatch_ios(notification_id, notif):
    """
    Dispatches VoIP push notification for iOS.

    Generates JWT authentication token for APNs request using the declared private key and its key
    ID. Creates headers dictionary using this auth token. Makes HTTP/2 request through Hyper to
    Apple's APNs server and returns its response.

    Parameters:
    notification_id (str): Notification ID to send VoIP notification to.
    notif (dict): Notification payload.

    Returns:
    str: Response text from APNs request.
    int: Response status from APNs request.

    """

    payload = {
        "iss": "BRZ56NM6F3",
        "iat": time(),
    }

    auth_token = jwt.encode(
        payload, apns_key, algorithm="ES256", headers={"kid": "UAWJ8M274W"}
    )

    headers = {
        "authorization": "bearer " + auth_token.decode(),
        "apns-push-type": "voip",
        "apns-topic": "com.wavisits.watutors.voip",
    }

    # FIXME - Remove "sandbox" for production
    connection = HTTPConnection("api.sandbox.push.apple.com:443")
    connection.request(
        "POST", notification_id, json.dumps(notif).encode("utf-8"), headers=headers,
    )

    response = connection.get_response()

    return response.read(), response.status


def dispatch_android(notification_id, notif):
    """
    Dispatches background push notification for Android.

    Creates headers dictionary using OAuth 2.0 JWT token generated from Google's Application
    Default Credentials. Makes HTTP POST request to the wa-tutors Firebase project's messaging
    endpoint.

    Links:
    https://firebase.google.com/docs/cloud-messaging/migrate-v1
    https://firebase.google.com/docs/reference/admin/python/firebase_admin
    https://firebase.google.com/docs/reference/admin/python/firebase_admin.credentials

    Parameters:
    notification_id (str): Notification ID to send background notification to.
    notif (dict): Notification payload.

    Returns:
    str: Response text from FCM request.
    int: Response status from FCM request.

    """

    headers = {
        "Authorization": "Bearer " + app.credential.get_access_token(),
    }

    body = {
        "message": {
            "data": notif,
            "android": {
                "priority": "high",
                "restricted_package_name": "com.wavisits.watutors",
            },
            "token": notification_id,
        }
    }

    r = requests.post(
        "https://fcm.googleapis.com/v1/projects/wa-tutors/messages:send",
        headers=headers,
        json=body,
    )

    return r.text, r.status_code


def send_notification(request):
    """
    Sends incoming call notification.

    Checks for required notification ID and provider name in request JSON. Creates notification
    payload and dispatches iOS or Android notification depending on the notification ID. Deploy
    with `gcloud functions deploy send_notification.`

    Links:
    https://cloud.google.com/functions/docs/writing/http

    Parameters:
    request (flask.Request): The request object.

    Returns:
    str: Response text from notification request.
    int: Response status from notification request.

    Raises:
    ValueError: Invalid JSON or missing fields.

    """
    request_json = request.get_json()

    if request_json and "notification_id" in request_json:
        notification_id = request_json["notification_id"]

        if "provider_name" in request_json:
            provider_name = request_json["provider_name"]

            notif = {
                "handle": "Tutor Video Call",
                "callerName": provider_name,
            }

            if "/3/device" in notification_id:
                return dispatch_ios(notification_id, notif)
            else:
                return dispatch_android(notification_id, notif)
        else:
            raise ValueError("JSON is missing a 'provider_name' property")
    else:
        raise ValueError("JSON is invalid, or missing a 'notification_id' property")
