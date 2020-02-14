require("dotenv").config()

const {
  SERVER_PORT,
  PARSE_DATABASE_URI,
  PARSE_APP_ID,
  PARSE_MASTER_KEY,
  PARSE_FILE_KEY,
  PARSE_APP_NAME,
  PARSE_DASHBOARD_AUTH_USER_1,
  PARSE_DASHBOARD_AUTH_PASS_1
} = process.env

var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require('parse-dashboard');

var {
  PARSE_CLOUD_CODE,
  PARSE_MOUNT_LOCATION,
  PARSE_DASHBOARD_MOUNT_LOCATION
} = require("./util/constants")

var {
  getParseUrl,
  getParseDashboardUrl
} = require("./util/util")

var app = express();

var api = new ParseServer({
  databaseURI: PARSE_DATABASE_URI,
  cloud: PARSE_CLOUD_CODE,
  appId: PARSE_APP_ID,
  masterKey: PARSE_MASTER_KEY,
  fileKey: PARSE_FILE_KEY,
  serverURL: getParseUrl()
});

var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: getParseUrl(),
      appId: PARSE_APP_ID,
      masterKey: PARSE_MASTER_KEY,
      appName: PARSE_APP_NAME
    }
  ],
  trustProxy: 1,
  users: [
    {
      user: PARSE_DASHBOARD_AUTH_USER_1,
      pass: PARSE_DASHBOARD_AUTH_PASS_1,
      apps: [{ appId: PARSE_APP_ID }]
    }
  ],
});

app.use(PARSE_MOUNT_LOCATION, api);
app.use(PARSE_DASHBOARD_MOUNT_LOCATION, dashboard);

app.get("/", function (req, res) {
  res.send("I am healthy");
})

app.listen(1337, function () {
  console.log(`np-server running on port ${SERVER_PORT}`);
  console.log(`access parse api on ${getParseUrl()}`);
  console.log(`access parse api on ${getParseDashboardUrl()}`);
});
