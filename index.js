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
    html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px; 
    ">
    <h2>Here is your order!</h2>
    <p>${text}</p>

    <p>Thank you, ThaiSun restaurant</p>
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
