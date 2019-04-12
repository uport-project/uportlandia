if (process.env.REACT_APP_TARGET_ENV === "production") {
    module.exports = require("./store.prod");
} else {
    module.exports = require("./store.dev");
}
