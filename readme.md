# Repo for WaTutor Firebase Cloud Functions

## Git Commit Guide

Read both this [github commit starter guide](https://medium.com/@nawarpianist/git-commit-best-practices-dab8d722de99) and [github commit best practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices). Follow these best practices whenever possible. Healthy habits save sanity.  

[Smart Commit Commands](https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/) should be should be used whenever applicable to update Jira. For example `JRA-34 #comment corrected indent issue`

#### Versions
TODO research CI/CD automated tools
Version numbering officially started at 1.0.0
- **1**
  - **0.0** add tutor verification, add url to search for sessions by email, 

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
  - **tutorCredentialCheck** - @j-chick
    - function to perform background and credential checks on applicant tutors
    - TODO rethink function naming to refelect added background check functionality
  - **verifyEmail** @stoddabr
    - functions and one-off-pages that handle email verification
  - *index.js* imports functions and sets triggers
  - *package.json*
- public
  - *Handling for Universal Links into WaTutor app.*

## To Deploy
Values for `${project}`. For more information, see [this document](https://docs.google.com/document/d/1gZGQlRQQR2Tgdk1-uPGFcvGxJotpyK8v8yv8z2cyMPQ/): 

 - `wa-tutors` V0 (Deployed)
 - `watutors-1` V1 (Under development) 

Select the project (setup): `firebase use ${project}`


Windows: `firebase use ${project}`

Unix: `firebase use ${project}`

Deploy your desired functions:

Windows: `firebase deploy --only functions[:triggerIncomingCall,createCharge,etc.]`

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


### High-level / Quick start

Dev steps:

0. [Initialize Firebase Cloud Functions CLI](https://firebase.google.com/docs/functions/get-started#set-up-node.js-and-the-firebase-cli).
1. Add a file `functions/tutorCredentialCheck/index.js`.
2. Write a call to Google's [Cloud Vision API](https://cloud.google.com/vision/docs/request).
3. Experiment around with the JSON that gets returned
    - Use [this website](https://cloud.google.com/vision/docs/drag-and-drop) to get JSON without needing to make an API call.
4. [Parse documents](https://cloud.google.com/vision/docs/pdf). [More info here](https://cloud.google.com/vision/docs/ocr#detect_text_in_a_remote_image).
    - Talk to Pelham/Sanjay to see if we even need to worry about images if so, optimize it for images (png, jpg, mpg). See slack message about [fiducials](https://en.wikipedia.org/wiki/Fiducial_marker).
5. Talk to Pelham about testing on multiple images.

### Test Functions
1. Generate a new [private key file](https://console.firebase.google.com/u/0/project/watutors-1/settings/serviceaccounts/adminsdk) for the Firebase Admin SDK.
2. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the full path of the key file.
3. Copy server-side functions config into ./functions: `firebase functions:config:get > .runtimeconfig.json`
4. Start emulator: `firebase emulators:start --only functions`
5. In a separate CLI run: `firebase functions:shell`
6. In the future, you should only need to run 5.
