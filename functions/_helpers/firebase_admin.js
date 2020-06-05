/**
 * helper to avoid initialzing the firebase admin multiple times
 */
const admin = require('firebase-admin');

admin.initializeApp();

module.exports = admin;
