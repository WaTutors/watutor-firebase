exports.studentWelcomeTemplate = `

<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>

  <!-- declaring typography -->
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 800;
        src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 800;
        src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody,
    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }

    div[style*="margin: 14px 0"],
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    table,
    td {
      mso-table-lspace: 0;
      mso-table-rspace: 0;
    }

    table,
    tr,
    td {
      border-collapse: collapse;
    }

    body,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      -webkit-text-size-adju st: 100%;
      -ms-text-size-adjust: 100%;
      mso-line-height-rule: exactly;
    }

    img {
      border: 0;
      outline: none;
      line-height: 100%;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }

    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
    }

    .pc-gmail-fix {
      display: none;
      display: none !important;
    }

    @media screen and (min-width: 621px) {
      .pc-email-container {
        width: 620px !important;
      }
    }

    @media screen and (max-width:620px) {
      .pc-sm-p-20 {
        padding: 20px !important
      }

      .pc-sm-p-30-20 {
        padding: 30px 20px !important
      }

      .pc-sm-fs-30 {
        font-size: 30px !important
      }

      .pc-sm-fs-18 {
        font-size: 18px !important
      }

      .pc-sm-p-35-10-15 {
        padding: 35px 10px 15px !important
      }

      .pc-sm-mw-50pc {
        max-width: 50% !important
      }

      .pc-sm-p-24-20-30 {
        padding: 24px 20px 30px !important
      }

      .pc-sm-p-35-30-40 {
        padding: 35px 30px 40px !important
      }

      .pc-sm-mw-100pc {
        max-width: 100% !important
      }

      .pc-sm-m-0-auto {
        float: none !important;
        margin: auto !important
      }

      .pc-sm-p-21-10-14 {
        padding: 21px 10px 14px !important
      }

      .pc-sm-h-20 {
        height: 20px !important
      }
    }

    @media screen and (max-width:525px) {
      .pc-xs-p-10 {
        padding: 10px !important
      }

      .pc-xs-p-25-10 {
        padding: 25px 10px !important
      }

      .pc-xs-fs-16 {
        font-size: 16px !important
      }

      .pc-xs-br-disabled br {
        display: none !important
      }

      .pc-xs-p-25-0-5 {
        padding: 25px 0 5px !important
      }

      .pc-xs-mw-100pc {
        max-width: 100% !important
      }

      .pc-xs-p-15-10-20 {
        padding: 15px 10px 20px !important
      }

      .pc-xs-h-100 {
        height: 100px !important
      }

      .pc-xs-fs-30 {
        font-size: 30px !important
      }

      .pc-xs-lh-42 {
        line-height: 42px !important
      }

      .pc-xs-p-20-20-25 {
        padding: 20px 20px 25px !important
      }

      .pc-xs-p-5-0 {
        padding: 5px 0 !important
      }
    }

    /* let's style hyperlinks */

    a:link {
      color: #3478F6;
    }

    a:visited {
      color: #9B9B9B;
    }
  </style>
  <!--[if mso]>
    <style type="text/css">
        .pc-fb-font {
            font-family: Helvetica, Arial, sans-serif !important;
        }
    </style>
    <![endif]-->
  <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
</head>

<body
  style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4"
  class="" data-gr-c-s-loaded="true">
  <span
    style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">###PREVIEW_TEXT###</span>
  <table class="pc-email-body" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="table-layout: fixed;">
    <tbody>
      <tr>
        <td class="pc-email-body-inner" align="center" valign="top">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" src="" color="#f4f4f4"></v:fill>
            </v:background>
            <![endif]-->
          <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
          <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
            role="presentation" style="margin: 0 auto; max-width: 620px;">
            <tbody>
              <tr>
                <td align="left" valign="top" style="padding: 0 10px;">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- BEGIN MODULE: Menu 1 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-20 pc-xs-p-10" bgcolor="#ffffff" valign="top"
                          style="padding: 0px 0px; background-color: #ffffff; border-radius: 8px">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td align="center" valign="top" style="padding: 10px;">
                                  <a href="https://watutors.com" style="text-decoration: none;"><img
                                      src="https://firebasestorage.googleapis.com/v0/b/wa-tutors.appspot.com/o/public%2FIMG_3357.PNG?alt=media"
                                      width="" height="" alt="WaTutors Logo"
                                      style="height: auto; max-width: 100%; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff; font-size: 14px;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" valign="top">
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 1 -->

                  <!-- Begin Original Style Module 
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20 pc-xs-p-25-10" style="padding: 40px 30px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">
                                  Welcome, Name.
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px" valign="top">
                                  Thank you for joining the WaTutors community. 
                                    <br> Verify your email to get started.
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="text-align: center; border-radius: 8px; padding: 14px 19px; background-color: #3478F6;" bgcolor="#3478F6" valign="top" align="center">
                                          <a class="pc-fb-font" href="###MAINLINK###" style="text-decoration: none; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; word-break: break-word; display: block;">###BUTTONTEXT###</a>
                                        </td>
                                      </tr>
                                          <tr>
                                                  <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                </tr> 
                                      <tr>
                                          <td class="disclaimer" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;" valign="top">
                                              By clicking you agree to our <a href="TERM_OF_USE_LINK">Terms of Use</a>, and Code of Conduct (below). 
                                          </td>
                                        </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                            
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    END MODULE: Original Transactional 1 -->

                  <!-- BEGIN MODULE: FAQs Header -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td background="https://storage.googleapis.com/public_watutor_assets/hero.jpeg"
                          bgcolor="#1B1B1B" valign="top"
                          style="background-color: #1B1B1B; background-image: url('https://storage.googleapis.com/public_watutor_assets/hero.jpeg'); background-position: top center; background-size: cover; opacity: .9; border-radius: 8px">
                          <!--[if gte mso 9]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                <v:fill type="frame" src="images/header-1-image-1.jpg" color="#1B1B1B"></v:fill>
                <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                    <div style="font-size: 0; line-height: 0;">
                        <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center">
                            <tr>
                                <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                        <tr>
                                            <td colspan="3" height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td width="30" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                            <td valign="top" align="left">
            <![endif]-->
                          <!--[if !gte mso 9]><!-->
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-24-20-30 pc-xs-p-15-10-20" valign="top"
                                  style="padding: 24px 30px 40px;">
                                  <!--<![endif]-->
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" valign="top"
                                          style="padding: 13px 10px 0; letter-spacing: -0.7px; line-height: 46px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; color: #ffffff;">
                                          Welcome!
                                        </td>
                                        <!--removed name placeholder bc of confusion around names-->
                                      </tr>
                                      <tr>
                                        <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font"
                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #ffffff; padding: 0 10px"
                                          valign="top">
                                          Thank you for joining the WaTutors community.
                                          <br> Activate your account to get started.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                            <tbody>
                                              <tr>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="pc-xs-h-100" height="135" style="line-height: 1px; font-size: 1px;">
                                          &nbsp;</td>
                                      </tr>
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                          <td
                                            style="text-align: center; border-radius: 8px; padding: 14px 19px; background-color: #3478F6;"
                                            bgcolor="#3478F6" valign="top" align="center">
                                            <a class="pc-fb-font" href="###MAINLINK###""
                                              style=" text-decoration: none; line-height: 24px; letter-spacing: -0.2px;
                                              font-family: 'Fira Sans' , Helvetica, Arial, sans-serif; font-size: 16px;
                                              font-weight: 500; color: #ffffff; word-break: break-word; display:
                                              block;">###BUTTONTEXT###</a>
                                          </td>
                                        </tr>
                                        <tr>
                                        <tr>
                                          <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                        </tr>

                                        <td class="disclaimer"
                                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;"
                                          valign="top">
                                          By clicking you agree to our
                                          <a href="###TERM_OF_USE_LINK###" style="#2468E5">
                                            Terms of Use
                                          </a>
                                          , and Code of Conduct (below).
                                          <!--removed bc we don't have one <a href="###LIABILITY_WAIVER_LINK###"
                                            style="#3478F6">Liability Waiver</a>,-->
                                        </td>
                              </tr>
                              <tr>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if !gte mso 9]><!-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--<![endif]-->
                  <!--[if gte mso 9]>
                                            </td>
                                            <td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </v:textbox>
            </v:rect>
            <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- END MODULE: FAQs Header -->


          <!-- BEGIN MODULE: Feature 1 -->

          <!-- gap -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tbody>
              <tr>
                <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
              </tr>
            </tbody>
          </table>


          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
            <tbody>
              <tr>
                <td class="pc-sm-p-35-10-15 pc-xs-p-25-0-5"
                  style="padding: 40px 20px; background-color: #ffffff; border-radius: 8px;" valign="top"
                  bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px;"
                          valign="top">
                          Features
                        </td>
                      </tr>
                      <tr>
                        <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px;"
                          valign="top">
                          As a part of the WaTutors community, you'll enjoy access to:
                        </td>
                      </tr>
                      <tr>
                        <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td style="font-size: 0;" valign="top">
                          <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="33%" valign="top"><![endif]-->
                          <div class="pc-sm-mw-50pc pc-xs-mw-100pc"
                            style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td style="padding: 20px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td valign="top">
                                            <img
                                              src="https://storage.googleapis.com/public_watutor_assets/fingerprint.svg"
                                              width="48" height="48" alt=""
                                              style=" max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;"
                                            valign="top">
                                            Tutors at your Fingertips
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;"
                                            valign="top">
                                            Our platform features tutors with experience teaching a variety of grade
                                            levels and subjects.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                          <div class="pc-sm-mw-50pc pc-xs-mw-100pc"
                            style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td style="padding: 20px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td valign="top">
                                            <img src="https://storage.googleapis.com/public_watutor_assets/schedule.svg"
                                              width="48" height="48" alt=""
                                              style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;"
                                            valign="top">
                                            On-demand Scheduling
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;"
                                            valign="top">
                                            Tutoring sessions can be booked seven days a week, 8AM to 8PM, up to one
                                            hour in advance.
                                          </td>
                                        </tr>
                                      </tbody>

                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                          <div class="pc-sm-mw-50pc pc-xs-mw-100pc"
                            style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td style="padding: 20px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td valign="top">
                                            <img
                                              src="https://storage.googleapis.com/public_watutor_assets/certified.svg"
                                              width="48" height="48" alt=""
                                              style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #1B1B1B;">
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B;"
                                            valign="top">
                                            Board-Certified Teachers
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font"
                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B;"
                                            valign="top">
                                            All of our tutors are certified to teach in Washington State.
                                          </td>
                                        </tr>
                                      </tbody>

                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- END MODULE: Feature 1 -->

          <!-- BEGIN MODULE: Code of Conduct -->

          <!-- mock table to give a break! -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tbody>
              <tr>
                <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
              </tr>
            </tbody>
          </table>

          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
            <tbody>
              <tr>
                <td class="pc-sm-p-35-10-15 pc-xs-p-25-0-5"
                  style="padding: 40px 20px; background-color: #ffffff; border-radius: 8px;" valign="top"
                  bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px;"
                          valign="top">
                          Code of Conduct
                        </td>
                      </tr>
                      <tr>
                        <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px;"
                          valign="top">
                          To ensure everyone has a safe experience, keep these rules in mind:
                        </td>
                      </tr>
                      <tr>
                        <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                          valign="top">
                          Respect
                        </td>
                      </tr>
                      <tr>
                        <td class="pc-fb-font"
                          style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                          valign="top">
                          <b>We require all interactions </b>between Parent/Guardians, Students, and Tutors to be civil
                          and respectful. We hope they will be kind and friendly as well.
                        </td>
                      </tr>
                      <tr>
                        <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        Courtesy
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>We recommend that</b> you are ready with your materials 5 minutes prior to the start so that
                        you are able to get the most out of your session. Your Tutor will also appreciate your
                        preparedness and punctuality.
                        <br>
                        <b>We understand that </b>plans change. As a courtesy to the tutors who depend on the money
                        earned from their work, we request that you give at least 24 hours notice when cancelling a
                        session. If you cancel with less than 24 hours notice we will charge you and pay the tutor for
                        their time.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        Background, Sound, and Lighting
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>The background of your video stream </b>seen by the Tutor should be as neutral as possible; a
                        background that is typical of a classroom environment would be best. The lighting should be
                        sufficient to show your face fully to the Student. We also require that during the session no
                        music or other audio that might distract from the tutoring be audible to the Student.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        No contact outside platform
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>Students or Parents/Guardians </b>are not allowed to ask the Tutor directly or indirectly to
                        have contact outside the scheduled sessions on the WaTutors platform. Any attempt at or actual
                        contact with a Tutor would be considered a violation of our code or conduct.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        Topics not allowed to be discussed during session
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>Given the short period of time </b>of a session and the potential for misunderstandings we
                        strongly urge Students and Parent/Guardians to limit all discussions to the subject matter for
                        which the session was booked. We understand that it is helpful to engage in conversation in
                        order to develop a level of comfort and trust with Tutors but we suggest that such conversations
                        be kept to the minimum length required.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        Personal Identifying Information (PII)
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>At no point </b>should you provide any information about yourself that is not already
                        available in your brief bio. We discourage exchange of PII and it is absolutely forbidden to ask
                        the Tutor any PII about themselves. Should the Tutor volunteer their PII we ask that you
                        discourage them from providing such information. Should the Tutor persist then they would be in
                        violation of the code of conduct and you may choose to end the session.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #1B1B1B; padding: 0 20px"
                        valign="top">
                        Termination of session by student
                      </td>
                    </tr>
                    <tr>
                      <td class="pc-fb-font"
                        style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 20px"
                        valign="top">
                        <b>You may choose to end </b>a tutoring session at any time if you feel the need to do so. You
                        are not required to provide any explanation before terminating the call, but please feel free to
                        inform your Tutor if you feel comfortable doing so.
                        <br>
                        <b>If a situation arises </b>in which you perceive the behavior of the Tutor as unacceptable, we
                        urge you to inform the Tutor of the problem if you feel comfortable doing so. You can then
                        choose to inform them that you will have to report their behavior and disconnect the call,
                        though you may disconnect the call at anytime without any warning should you feel in any way
                        uncomfortable with the behavior of the Tutor.
                        <br>
                        <b>The only people who are allowed </b>to be present during the scheduled session are the Tutor,
                        the Student, and the Parent/Guardian. If anyone else is present during the session you should
                        consider it a violation of the code of conduct and request that the additional person/s leave
                        the session. If the additional person/s do not leave the session then you should terminate the
                        call immediately and report it to WaTutors.
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>

            </tbody>
            <tbody>
              <tr>
                <td style="font-size: 0;" valign="top">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="33%" valign="top"><![endif]-->
                  <div class="pc-sm-mw-50pc pc-xs-mw-100pc"
                    style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">

                    </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- END MODULE: Code of Conduct -->


  <!-- BEGIN MODULE: Footer -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tbody>
      <tr>
        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
      </tr>
    </tbody>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
    <tbody>
      <tr>
        <td class="pc-sm-p-21-10-14 pc-xs-p-5-0"
          style="padding: 21px 20px 14px 20px; background-color: #1B1B1B; border-radius: 8px;" valign="top"
          bgcolor="#1B1B1B" role="presentation">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
            <tbody>
              <tr>
                <td style="font-size: 0;" valign="top">
                  <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
                  <div class="pc-sm-mw-100pc"
                    style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td style="padding: 20px;" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                    valign="top">
                                    Questions?
                                  </td>
                                </tr>
                                <tr>
                                  <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;"
                                    valign="top">
                                    Here are some <a href="###FAQ_LINK###"
                                      style="text-decoration: none; color: #1595E7">FAQs</a>.
                                  </td>
                                </tr>
                                <tr>
                                  <td class="pc-sm-h-20" height="56" style="line-height: 1px; font-size: 1px;">&nbsp;
                                  </td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td style="font-family: Arial, sans-serif; font-size: 19px;" valign="top">
                                    <a href="###FACEBOOKLINK###" style="text-decoration: none;"><img
                                        src="https://storage.googleapis.com/public_watutor_assets/facebook-dark-gray.png"
                                        width="20" height="20" alt=""
                                        style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                    <span>&nbsp;&nbsp;</span>

                                    <!-- other social icons if needed 
                                                    <a href="http://example.com" style="text-decoration: none;"><img src="images/twitter-dark-gray.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                    <span>&nbsp;&nbsp;</span>
                                                    <a href="http://example.com" style="text-decoration: none;"><img src="images/instagram-dark-gray.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                    <span>&nbsp;&nbsp;</span>
                                                    <a href="http://example.com" style="text-decoration: none;"><img src="images/pinterest-dark-gray.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a> 
                                                    -->

                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                  <div class="pc-sm-mw-100pc"
                    style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td style="padding: 20px;" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                    valign="top">
                                    Contact us.
                                  </td>
                                </tr>
                                <tr>
                                  <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px;"
                                    valign="top">
                                    <a href="tel:###CONTACT_US_PHONE###" style="text-decoration: none; color: #ffffff;">
                                      ###CONTACT_US_PHONE###
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td height="9" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; line-height: 24px;"
                                    valign="top">
                                    <a href="###CONTACT_US_EMAIL###"
                                      style="text-decoration: none; color: #1595E7;">###CONTACT_US_EMAIL###</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- END MODULE: Footer 1 -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <tr>
        <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
      </tr>
    </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
  </td>
  </tr>
  </tbody>
  </table>
  <!-- Fix for Gmail on iOS -->
  <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>

</html>
`;
