# Repo for Wa-Tutor Cloud Functions

### file structure

- functions
- - _sendNotification-flask
- - - *legacy flask function for sending app notification(s)*
- - setPin - Brett
- - - *HTML page for setting pin*
- - sendNotification - Luca
- - - *_@luca todo move notification code here_*
- - sendStripeCharge - Luca
- - - *_@luca todo move stripe code here_*
- - *index.js* imports functions and sets triggers
- - *package.json* 
- public
- - *bumper pages and whatnot*

## to deploy:
`firebase deploy --only functions`

### to deploy specific functions **recommended**
to deploy only the functions funct1() and funct2()
`firebase deploy --only functions:func1,functions:func2`

### to deploy a single function
comment out other functions and select `N` to the prompt:
`? Would you like to proceed with deletion? Selecting no will continue the rest of the deployments.`

## to setup project

### set up linter

If having issues, try copying .eslintrc.json into home directory
Then run `npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard`

Tutorial if all else goes wrong: https://travishorn.com/setting-up-eslint-on-vs-code-with-javascript-standard-style-aa3ab75bcc1c

If still having issues, try resetting VS lint extension settings (especially `Node Path` `Package Manager` (set to npm) `Eslint: Debug`)
