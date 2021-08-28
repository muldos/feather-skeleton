// Initializes the `softapp` service on path `/softapp`
const { Softapp } = require("./softapp.class");
const createModel = require("../../models/softapp.model");
const hooks = require("./softapp.hooks");
const {
  JsonSchemaManager,
  OpenApi3Strategy,
} = require("@alt3/sequelize-to-json-schemas");
const schemaManager = new JsonSchemaManager();

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };
  // and/or the OpenAPI 3.0 equivalent
  let schema = schemaManager.generate(options.Model, new OpenApi3Strategy());
  const softappService = new Softapp(options, app);
  softappService.docs = {
    description: "CRUD over software app",
    definitions: {
      softapp: schema,
      softapp_list: {
        //this library currently configures the return documentation to look for ``${tag} list`
        type: "array",
        items: { $ref: "#/definitions/softapp" },
      },
    },
  };
  // Initialize our service with any options it requires
  app.use("/softapp", softappService);

  // Get our initialized service so that we can register hooks
  const service = app.service("softapp");

  service.hooks(hooks);
};
