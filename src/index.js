require("dotenv").config()

const {
  SERVER_PORT,
  PARSE_DATABASE_URI,
  PARSE_APP_ID,
  PARSE_MASTER_KEY,
  PARSE_FILE_KEY
} = process.env

var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var { PARSE_CLOUD_CODE, PARSE_MOUNT_LOCATION } = require("./util/constants")
var { getParseUrl } = require("./util/util")

var app = express();

var api = new ParseServer({
  databaseURI: PARSE_DATABASE_URI,
  cloud: PARSE_CLOUD_CODE,
  appId: PARSE_APP_ID,
  masterKey: PARSE_MASTER_KEY,
  fileKey: PARSE_FILE_KEY,
  serverURL: getParseUrl()
});

app.use(PARSE_MOUNT_LOCATION, api);

app.get("/", function (req, res) {
  res.send("I am healthy");
})

app.listen(1337, function () {
  console.log(`np-server running on port ${SERVER_PORT}`);
  console.log(`access parse api on ${getParseUrl()}`);
});
