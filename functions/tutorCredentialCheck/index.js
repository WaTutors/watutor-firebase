const bucketName = 'watutors-1.appspot.com';

// Simple search through all text in document TODO revise
function searchText(text, pattern, start) {
    const minIndex = text.indexOf(pattern, start || 0);
    return minIndex;
};

// // helper to set email html
// function generateManualVerificationHtml({ title, mainText, link, linkText }) {
//     const { simplePage } = require('../sendEmail/templates/simplePage');
//     let html = simplePage;
//     html = html.toString();
//     html = html.replace(/###TITLE###/g, title);
//     html = html.replace(/###MAINTEXT###/g, mainText);
//     html = html.replace(/###LINK###/g, link);
//     html = html.replace(/###LINKTEXT###/g, linkText);
//     return html;
// }

// SECTION
// TODO Revise & Document

exports.verifyCredential = async (data, context) => {

    const uid = data.uid;
    const { cert, legalName, state } = data.cred;

    // Get text annotation from Google Cloud Vision API
    const { annotate } = require('../_helpers/googleCloudVision');
    console.assert(uid);
    console.assert(cert);
    const gcsSourceUri = `gs://${bucketName}/${uid}/cert/${cert}`;
    const gcvResult = await annotate(gcsSourceUri);
    const text = gcvResult.fullTextAnnotation.text.toLowerCase(); // NOTE lowercase for convenience
    console.assert(text);

    // // Split legal name into first and last names
    const legalNameParts = legalName.split(' ');
    console.assert(legalNameParts.length >= 2);
    const firstName = legalNameParts[0];
    const lastName = legalNameParts[legalNameParts.length - 1];
    console.assert(firstName && lastName);
    
    let messages = new Array();

    // "Verify" first name
    const firstNameIndex = searchText(text, firstName.toLowerCase());
    console.assert(firstNameIndex != -1);
    if (firstNameIndex == -1) {
        messages.push(`Unable to recognize first name '${firstName}' in uploaded document`);
    }

    // Verify last name
    const lastNameIndex = searchText(text, lastName.toLowerCase(), firstNameIndex);
    console.assert(lastNameIndex != -1);
    if (lastNameIndex == -1) {
        messages.push(`Unable to recognize last name '${lastName}' in uploaded document`);
    }

    // Verify state
    const stateIndex = searchText(text, state.toLowerCase());
    console.assert(stateIndex != -1);
    if (stateIndex == -1) {
        messages.push(`Unable to recognize state '${state}' in uploaded document`);
    }

    messages.push('FINAL TEST'); //FIXME

    const body = {};
    if (messages.length == 0) {
        body.valid = 'yes';
    } else {
        const { manualVerificationEmail } = require('../sendEmail');
        // const emailHtml = generateManualVerificationHtml({
        //     title: 'Manual credential verification required',
        //     mainText: messages.join('<br>'),
        //     link: `https://console.firebase.google.com/u/1/project/watutors-1/storage/watutors-1.appspot.com/files~2F${uid}~2Fcert`,
        //     linkText: 'View document'
        // });
        const res = await manualVerificationEmail(uid, messages);
        console.assert(res.accepted.length === 1);
        body.valid = 'pending';
        body.messages = messages;
    }
    return body;
};

// !SECTION
