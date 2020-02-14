var { PARSE_MOUNT_LOCATION } = require("./constants");
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

module.exports = {
    getUrl,
    getParseUrl
}
