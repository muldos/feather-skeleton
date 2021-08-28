const express = require("@feathersjs/express");

module.exports.getApp = function (app) {
  const hostingType = process.env.HOSTING_TYPE || "container";
  let mainApp = null;
  if (hostingType === "container") {
    mainApp = app;
  }
  if (hostingType === "cloud") {
    mainApp = express().use("/prefix", app);
  }
  app.set("hostingType", hostingType);
  return mainApp;
};
