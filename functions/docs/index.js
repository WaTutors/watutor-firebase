// used for documentation
// visible at {baseUrl}/docs

function generateReDocHtml(url) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Brett's CF Doc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/x-icon" href="https://quizizz.com/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <!-- we provide is specification here -->
    <redoc spec-url='${url}' expand-responses="all"></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
  </body>
</html>
`;
}

exports.getDocs = (req, res) => {
  const isWin = process.platform === 'win32'; // if running deployed
  const protocol = isWin ? 'http' : 'https';
  const yamlEndpoint = isWin ? '/watutors-1/us-central1/getYaml' : '/getYaml';
  const url = `${protocol}://${req.get('host')}${yamlEndpoint}`;
  return res.send(generateReDocHtml(url));
};

exports.getYaml = (req, res) => {
  const isWin = process.platform === 'win32'; // if running deployed
  const path = `${__dirname}${isWin ? '\\' : '/'}current.yaml`;
  console.log(path);
  return res.sendFile(path);
};
