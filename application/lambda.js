const serverlessExpress = require("@vendia/serverless-express");
const app = require("./src/app");

module.exports = serverlessExpress({ app });
