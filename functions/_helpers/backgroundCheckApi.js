// SECTION Background Check API Config
// NOTE Property names in this file reflect the Background Check API naming convention.
// TODO Link to official documentation
const backgroundCheckApiConfig = Object.freeze({
  baseUrl: 'http://apijson.backgroundcheckapi.com/', // REVIEW '/' at end?
  credentials: {
    App_Id: 'pra-8ed7978f',
    App_Key: 'e81cd27a1192e8bc8cb402f047740f7c',
  },
  exactMatchRequired: false, // REVIEW This is a business decision.
});
// !SECTION Background Check API Config

exports.buildBackgroundCheckUrl = (personData) => {
  const { baseUrl, credentials, exactMatchRequired } = backgroundCheckApiConfig;
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
  url += `&ExactMatch=${exactMatchRequired ? 'Yes' : 'No'}`; // FIXME this is redundant right now; remove logic in other fileß
  return url;
};
