if (process.env.REACT_APP_TARGET_ENV === "prod") {
    module.exports = require("./store.prod");
} else {
    module.exports = require("./store.dev");
}
