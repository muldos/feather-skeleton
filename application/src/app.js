const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const logger = require("./logger");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const swagger = require("feathers-swagger");

const middleware = require("./middleware");
const services = require("./services");

const appHooks = require("./app.hooks");
const channels = require("./channels");

//const sequelize = require("./sequelize");
const app = express(feathers());

// Load app configuration
app.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hostingType = process.env.HOSTING_TYPE || "container";
const prefix = process.env.API_PREFIX || "";
const uriPrefix = prefix !== "" ? "/" + prefix : "";
app.set("hostingType", hostingType);
app.set("api_prefix", uriPrefix);
console.log("== init logs ===");
console.log(app.get("api_prefix"));
console.log(app.get("public"));
console.log(__dirname);
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());

//app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// swagger plugin set up
console.log(uriPrefix + "/docs");
app.configure(
  swagger({
    specs: {
      basePath: app.get("api_prefix"),
      info: {
        title: "SCDS api",
        description: "A description",
        version: "1.0.0",
      },
      schemes: ["http", "https"], // Optionally set the protocol schema used (sometimes required when host on https)
    },
    openApiVersion: 2,

    docsPath: "/docs",
    docsJsonPath: "/docs/swagger.json",
    uiIndex: path.join(app.get("public"), "swagger", "index.html"),
  })
);
// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
