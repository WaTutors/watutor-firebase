exports.tutorConfirmTemplate = `
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

  <!-- formatting -->
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
      -webkit-text-size-adjust: 100%;
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

    /* crop circular photo */
    .image-cropper {
      width: 150px;
      height: 150px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
    }

    .profile-pic {
      display: inline;
      margin: 0 auto;
      margin-left: -25%; //centers the image
      height: 100%;
      width: auto;
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
    style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">A
    student has reserved one of your slots.</span>
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

                  <!-- BEGIN MODULE: Logo -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-20 pc-xs-p-10" bgcolor="#ffffff" valign="top"
                          style="padding: 0px 0px; background-color: #ffffff; border-radius: 8px">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td align="center" valign="top" style="padding: 10px;">
                                  <a href="###LOGOLINK###" style="text-decoration: none;"><img
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
                  <!-- END MODULE: Logo -->

                  <!-- BEGIN MODULE: Announcement -->
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
                        <td class="pc-sm-p-30-20 pc-xs-p-25-10"
                          style="padding: 40px 30px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff"
                          valign="top">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font"
                                  style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;"
                                  valign="top">
                                  New tutoring session scheduled.
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font"
                                  style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px"
                                  valign="top">
                                  A student has reserved one of your slots.
                                </td>

                              </tr>
                              <tr>
                                <td height="10" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>

                            <div class="pc-sm-mw-50pc pc-xs-mw-100pc"
                              style="display: inline-block; width: 100%; max-width: 186px; vertical-align: top;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                <tbody>
                                  <tr>
                                    <td style="padding: 20px;" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                        role="presentation">
                                        <tbody>
                                          <tr>
                                            <td valign="top">
                                              <img src="https://firebasestorage.googleapis.com/v0/b/wa-tutors.appspot.com/o/public%2Fschedule.svg?alt=media" width="150" height="150" alt=""
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
                                              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 50px; letter-spacing: -0.2px; color: #1B1B1B; "
                                              valign="top">
                                              ###TIMESTRING###
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="pc-fb-font"
                                              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 22px; letter-spacing: -0.2px; color: #9B9B9B;"
                                              valign="top">
                                              Grade: ###Grade###
                                              <br>
                                              Subject: ###Subject###
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="pc-xs-h-100" height="25"
                                              style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="text-align: center; border-radius: 8px; padding: 14px 19px; background-color: #3478F6;"
                                              bgcolor="#3478F6" valign="top" align="center">
                                              <a class="pc-fb-font" href="###DASHBOARD_LINK###"
                                                style="text-decoration: none; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; word-break: break-word; display: block;">Open
                                                the Tutor Dashboard</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>

                                  </tr>
                                </tbody>
                              </table>

                            </div>
                          </table>
                          <!-- END MODULE: Announcement -->

                          <!-- spacing -->
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tbody>
                              <tr>
                                <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>

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
                                  style="padding: 21px 20px 14px 20px; background-color: #1B1B1B; border-radius: 8px;"
                                  valign="top" bgcolor="#1B1B1B" role="presentation">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="font-size: 0;" valign="top">
                                          <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
                                          <div class="pc-sm-mw-100pc"
                                            style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                              role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 20px;" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                      role="presentation">
                                                      <tbody>
                                                        <tr>
                                                          <td class="pc-fb-font"
                                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                                            valign="top">
                                                            Questions?
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td height="11" style="line-height: 1px; font-size: 1px;">
                                                            &nbsp;</td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td class="pc-fb-font"
                                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;"
                                                            valign="top">
                                                            Here are some <a href="###FAQLINK###"
                                                              style="text-decoration: none; color: #1595E7">FAQs</a>.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td class="pc-sm-h-20" height="56"
                                                            style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td style="font-family: Arial, sans-serif; font-size: 19px;"
                                                            valign="top">
                                                            <a href="###FB_LOGOLINK###"
                                                              style="text-decoration: none;"><img
                                                                src="images/facebook-dark-gray.png" width="20"
                                                                height="20" alt=""
                                                                style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                            <span>&nbsp;&nbsp;</span>

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
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                              role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 20px;" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                      role="presentation">
                                                      <tbody>
                                                        <tr>
                                                          <td class="pc-fb-font"
                                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
                                                            valign="top">
                                                            Contact us.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td height="11" style="line-height: 1px; font-size: 1px;">
                                                            &nbsp;</td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td class="pc-fb-font"
                                                            style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; line-height: 24px;"
                                                            valign="top">
                                                            <a href="mailto:###CONTACT_US_EMAIL###"
                                                              style="text-decoration: none; color: #1595E7;">###CONTACT_US_EMAIL###</a>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td height="9" style="line-height: 1px; font-size: 1px;">
                                                            &nbsp;</td>
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
          <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>

</html>
`;
