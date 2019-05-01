const handler = require("serverless-express/handler");
const app = require("./server.shared");

module.exports.handler = handler(app);
