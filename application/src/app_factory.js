const express = require("@feathersjs/express");

module.exports.getApp = function (app) {
  const hostingType = process.env.HOSTING_TYPE || "container";
  const prefix = process.env.API_PREFIX || "";
  let mainApp = null;
  if (hostingType === "container") {
    mainApp = app;
  }
  if (hostingType === "cloud") {
    mainApp = express().use("/" + prefix, app);
  }

  return mainApp;
};
