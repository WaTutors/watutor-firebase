# Repo for WaTutors Firebase Cloud Functions

### File Structure

All functions are imported into a monolithic functions/index.js. They are defined by category into subfolders. 

- functions
  - **_helpers**
    - helper functions used by one or more functions
  - **_templates**
    - template functions that can be easily copy/pasted
  - **notifications** @lucapaler
    - functions relating to notifications
  - **scheduleReservations** @kris.wong / @stoddabr
    - function timeout for the reservation system that prevents double booking
  - **sendEmail** @stoddabr
    - functions that format and send different types of emails
  - **stripe** - @lucapaler
    - createCharge *and* captureCharge *Stripe functions.*
  - **verifyEmail** @stoddabr
    - functions and one-off-pages that handle email verification


  - *index.js* imports functions and sets triggers
  - *package.json*
- public
  - *Handling for Universal Links into WaTutors app.*

## To Deploy
Values for `${project}`. For more information, see [this document](https://docs.google.com/document/d/1gZGQlRQQR2Tgdk1-uPGFcvGxJotpyK8v8yv8z2cyMPQ/): 

 - `wa-tutors` V0 (Deployed)
 - `watutors-1` V1 (Under development) 

Select the project (setup):

Windows: `bash firebase use ${project}`

Unix: `firebase use ${project}`

Deploy your desired functions:

Windows: `bash firebase deploy --only functions[:triggerIncomingCall,createCharge,etc.]`

Unix: `firebase deploy --only functions[:triggerIncomingCall,createCharge,etc.]`

## Cloud Tasks Queue

This project also uses cloud task queues to manage delay timeouts. Several of the cloud functions in this repo are triggered by Tasks. 
See this [README](www.github.com/stoddabr/watutors-api) for more info on queues.

Helpful links
 - [Scheduling TTL with cloud tasks tutorial](https://medium.com/firebase-developers/how-to-schedule-a-cloud-function-to-run-in-the-future-in-order-to-build-a-firestore-document-ttl-754f9bf3214a)
 - [When to use cloud tasks vs cloud scheduler](https://cloud.google.com/tasks/docs/comp-tasks-sched)
 - [Trigging cloud functions with cloud tasks](https://cloud.google.com/tasks/docs/tutorial-gcf)

## Setup

THIS SECTION UNDER CONSTRUCTION. HARDHATS REQUIRED
`firebase init
**JESSE README** add a file `functions/tutorCredentialCheck/index.js`

Dev steps:
1. Write a call to google's (cloud vision api)[https://cloud.google.com/vision/docs/request] 
2. Experiment around with the JSON that gets returned
    - Use (this website)[https://cloud.google.com/vision/docs/drag-and-drop] to get JSON without needing to make an api call 
3. Parse documents ((pdf))[https://cloud.google.com/vision/docs/pdf]. (More info here.)[https://cloud.google.com/vision/docs/ocr#detect_text_in_a_remote_image]
    - Talk to Pelham/Sanjay to see if we even need to wory about images if so, Optomize it for images (png, jpg, mpg). See slack message about (fiducials)[https://en.wikipedia.org/wiki/Fiducial_marker] 
4. Talk to Pelham about testing on multiple images

### Test Functions
1. Generate a new [private key file](https://console.firebase.google.com/u/0/project/watutors-1/settings/serviceaccounts/adminsdk) for the Firebase Admin SDK.
2. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the full path of the key file.
3. Copy server-side functions config into ./functions: `firebase functions:config:get > .runtimeconfig.json`
4. Start emulator: `firebase emulators:start --only functions`
5. In a separate CLI run: `firebase functions:shell`
6. In the future, you should only need to run 5.
