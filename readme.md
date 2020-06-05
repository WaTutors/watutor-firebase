# Repo for WaTutors Firebase Cloud Functions

### File Structure

All functions are imported into a monolithic functions/index.js. They are defined by category into subfolders. 

- functions
  - **setPin** - @stoddabr
    - *HTML page for setting pin*
  - **notifications** - @lucapaler
    - triggerIncomingCall
  - **stripe** - @lucapaler
    - createCharge *and* captureCharge *Stripe functions.*
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

## Setup

THIS SECTION UNDER CONSTRUCTION. HARDHATS REQUIRED

### Test Functions
1. Generate a new [private key file](https://console.firebase.google.com/u/0/project/watutors-1/settings/serviceaccounts/adminsdk) for the Firebase Admin SDK.
2. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the full path of the key file.
3. Copy server-side functions config into ./functions: `firebase functions:config:get > .runtimeconfig.json`
4. Start emulator: `firebase emulators:start --only functions`
5. In a separate CLI run: `firebase functions:shell`
6. In the future, you should only need to run 5.
