// SECTION Background Check API Config
// NOTE Property names in this file reflect the Background Check API naming convention.

const credentials = {
  App_Id: 'pra-706ad937',
  App_Key: '540d22b4c27e78f694e19ca9a67616c8',
};
const baseUrl = 'http://apijson.backgroundcheckapi.com/'; // REVIEW '/' at end
const requireExactMatch = 'Yes'; // REVIEW This is a business decision.

// !SECTION Background Check API Config

exports.REQUIRE_EXACT_MATCH = requireExactMatch;

exports.getBackgroundCheckUrl = (personData) => {
  let url = baseUrl;
  url += `?App_ID=${credentials.App_Id}`;
  url += `&App_Key=${credentials.App_Key}`;
  url += '&catalogue=BACKGROUND'; // NOTE This parameter is fixed by the third-pary.
  Object.keys(personData).forEach((field) => {
    if (!field || !personData[field]) return;
    // NOTE capitalized first character per Background Check API naming convention
    const urlParam = field.charAt(0).toUpperCase() + field.slice(1);
    url += `&${urlParam}=${personData[field]}`;
  });
  return url;
};
