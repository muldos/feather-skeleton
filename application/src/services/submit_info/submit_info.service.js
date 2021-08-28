// Initializes the `submit_info` service on path `/submit-info`
const { SubmitInfo } = require("./submit_info.class");
const hooks = require("./submit_info.hooks");

module.exports = function (app) {
  const options = {};
  let submitSvc = new SubmitInfo(options, app);
  submitSvc.docs = {
    description: "Get sumbit info for the current user company",
    operations: {
      get: false,
      create: false,
      patch: false,
    },
  };

  // Initialize our service with any options it requires
  app.use("/submit-info", submitSvc);

  // Get our initialized service so that we can register hooks
  const service = app.service("submit-info");

  service.hooks(hooks);
};
