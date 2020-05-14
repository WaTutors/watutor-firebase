/** lightweight simple page usable for most simple cases
 * 
 * variables:
 * ###TITLE###
 * ###MAINTEXT###
 * ###LINK###
 * ###LINKTEXT###
 * 
 * extracted from: 
 * @link www.example.com
 */
exports.simple_page = `
<!doctype html>
<html>

<head>
  <title>Example Domain</title>

  <meta charset="utf-8" />
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
    body {
      background-color: #f0f0f2;
      margin: 0;
      padding: 0;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    }

    div {
      width: 600px;
      margin: 5em auto;
      padding: 2em;
      background-color: #fdfdff;
      border-radius: 0.5em;
      box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);
    }

    a:link,
    a:visited {
      color: #20A8D8;
      text-decoration: none;
    }

    @media (max-width: 700px) {
      div {
        margin: 0 auto;
        width: auto;
      }
    }
  </style>
</head>

<body>
  <div>
    <h1>###TITLE###</h1>
    <p>###MAINTEXT###</p>
    <p><a href="###LINK###">###LINKTEXT###</a></p>
  </div>
</body>

</html>
`