const {
    PARSE_MOUNT_LOCATION,
    PARSE_DASHBOARD_MOUNT_LOCATION,
    PARSE_GRAPHQL_PATH,
    PARSE_GRAPHQL_PLAYGROUNDPATH
} = require("./constants");

const {
    PARSE_SERVER_URL,
    SERVER_PORT
} = process.env

function getUrl() {
    return `${PARSE_SERVER_URL}:${SERVER_PORT}`;
}

function getParseUrl() {
    return `${getUrl()}${PARSE_MOUNT_LOCATION}`;
}

function getParseDashboardUrl() {
    return `${getUrl()}${PARSE_DASHBOARD_MOUNT_LOCATION}`;
}

function getGraphQLPath() {
  return `${getUrl()}${PARSE_GRAPHQL_PATH}`;
}

function getPlaygroundPath() {
  return `${getUrl()}${PARSE_GRAPHQL_PLAYGROUNDPATH}`;
}

module.exports = {
    getUrl,
    getParseUrl,
    getParseDashboardUrl,
    getGraphQLPath,
    getPlaygroundPath
}
