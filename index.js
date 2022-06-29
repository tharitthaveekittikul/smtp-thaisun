const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
  let { text, emailTo } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: false,
    debug: true,
    logger: true,
  });

  await transport.sendMail({
    from: "Thaisun <" + process.env.MAIL_FROM + ">",
    to: emailTo, // customer
    subject: "Order Thaisun Restaurant",
    html: `<div class="es-wrapper-color" style="background-color: #efefef">
    <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#efefef"></v:fill>
      </v:background>
    <![endif]-->
    <table
      class="es-wrapper"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-position: center top;
      "
    >
      <tr style="border-collapse: collapse">
        <td valign="top" style="padding: 0; margin: 0">
          <table
            class="es-content"
            cellspacing="0"
            cellpadding="0"
            align="center"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              table-layout: fixed !important;
              width: 100%;
            "
          >
            <tr style="border-collapse: collapse">
              <td align="center" style="padding: 0; margin: 0">
                <table
                  class="es-content-body"
                  cellspacing="0"
                  cellpadding="0"
                  bgcolor="#ffffff"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    background-color: #ffffff;
                    width: 600px;
                  "
                >
                  <tr style="border-collapse: collapse">
                    <td
                      align="left"
                      style="
                        margin: 0;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        padding-left: 20px;
                        padding-right: 20px;
                      "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                        "
                      >
                        <tr style="border-collapse: collapse">
                          <td
                            valign="top"
                            align="center"
                            style="padding: 0; margin: 0; width: 560px"
                          >
                            <table
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: separate;
                                border-spacing: 0px;
                                border-radius: 0px;
                              "
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              role="presentation"
                            >
                              <tr style="border-collapse: collapse">
                                <td
                                  align="center"
                                  style="
                                    padding: 0;
                                    margin: 0;
                                    padding-top: 10px;
                                    padding-bottom: 15px;
                                  "
                                >
                                  <h1
                                    style="
                                      margin: 0;
                                      line-height: 36px;
                                      mso-line-height-rule: exactly;
                                      font-family: 'trebuchet ms', helvetica,
                                        sans-serif;
                                      font-size: 30px;
                                      font-style: normal;
                                      font-weight: normal;
                                      color: #333333;
                                    "
                                  >
                                    Thanks for your order<br />
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          ${text}
        </td>
      </tr>
    </table>
  </div>
  
`,
  });
});

app.listen(process.env.MAIL_PORT || 4000, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Server listening ");
  console.log(process.env.MAIL_FROM);
});
