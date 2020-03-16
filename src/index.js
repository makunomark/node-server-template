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
var { default: ParseServer, ParseGraphQLServer } = require("parse-server");
var ParseDashboard = require('parse-dashboard');

var {
  PARSE_CLOUD_CODE,
  PARSE_MOUNT_LOCATION,
  PARSE_DASHBOARD_MOUNT_LOCATION,
  PARSE_GRAPHQL_PATH,
  PARSE_GRAPHQL_PLAYGROUNDPATH,
} = require("./util/constants")

var {
  getParseUrl,
  getParseDashboardUrl,
  getGraphQLPath,
  getPlaygroundPath
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

var parseGraphQLServer = new ParseGraphQLServer(
  api,
  {
    graphQLPath: PARSE_GRAPHQL_PATH,
    playgroundPath: PARSE_GRAPHQL_PLAYGROUNDPATH,
  }
)

var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: getParseUrl(),
      appId: PARSE_APP_ID,
      masterKey: PARSE_MASTER_KEY,
      appName: PARSE_APP_NAME,
      graphQLServerURL: getGraphQLPath()
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

app.use(PARSE_MOUNT_LOCATION, api.app);
app.use(PARSE_DASHBOARD_MOUNT_LOCATION, dashboard);
parseGraphQLServer.applyGraphQL(app)

app.get("/", function (req, res) {
  res.send("I am healthy");
})

app.listen(SERVER_PORT, function () {
  console.log(`np-server running on port ${SERVER_PORT}`);
  console.log(`access parse api on ${getParseUrl()}`);
  console.log(`access parse api on ${getParseDashboardUrl()}`);
  console.log(`access parse graphql endpoint on ${getGraphQLPath()}`);
});
