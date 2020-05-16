# Repo for Wa-Tutors Firebase Cloud Functions
![Lint and Deploy Functions](https://github.com/lucapaler/wa-tutors/workflows/Build%20and%20Deploy%20Functions/badge.svg)

### File Structure

- functions
  - **setPin** - @stoddabr
    - *HTML page for setting pin*
  - **notifications** - @lucapaler
    - triggerIncomingCall *function and future push notifications functions.*
  - **stripe** - @lucapaler
    - createCharge *and* captureCharge *Stripe functions.*
  - *index.js* imports functions and sets triggers
  - *package.json*
- public
  - *Handling for Universal Links into WaTutors app.*

## to deploy:
- Functions:
  `firebase deploy --only functions[:triggerIncomingCall,createCharge,etc.]`
- Hosting:
  `firebase deploy --only hosting`


## to setup project

### Test Functions
1. Generate a new [private key file](https://console.firebase.google.com/u/0/project/wa-tutors/settings/serviceaccounts/adminsdk) for the Firebase Admin SDK.
2. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the full path of the key file.
3. Copy server-side functions config into ./functions: `firebase functions:config:get > .runtimeconfig.json`
4. Start emulator: `firebase emulators:start --only functions`
5. In a separate CLI run: `firebase functions:shell`
6. In the future you should only need to run 5.

### set up linter

#### Ideally you should just need to run `yarn --ignore-engines` and you'll be alright.

If having issues, try copying .eslintrc.json into home directory
Then run `npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard`

Tutorial if all else goes wrong: https://travishorn.com/setting-up-eslint-on-vs-code-with-javascript-standard-style-aa3ab75bcc1c

If still having issues, try resetting VS lint extension settings (especially `Node Path` `Package Manager` (set to npm) `Eslint: Debug`)
