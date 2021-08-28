// Initializes the `volume` service on path `/volume`
const { Volume } = require("./volume.class");
const hooks = require("./volume.hooks");

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate"),
  };
  const volumeService = new Volume(options, app);
  volumeService.docs = {
    description: "A service to send and receive messages",
    definitions: {
      volume: {
        type: "object",
        required: ["text"],
        properties: {
          text: {
            type: "string",
            description: "The message text",
          },
          userId: {
            type: "string",
            description: "The id of the user that sent the message",
          },
        },
      },
      volume_list: {
        //this library currently configures the return documentation to look for ``${tag} list`
        type: "array",
        items: { $ref: "#/definitions/volume" },
      },
    },
  };
  // Initialize our service with any options it requires
  app.use("/volume", volumeService);

  // Get our initialized service so that we can register hooks
  const service = app.service("volume");
  // service generation
  service.hooks(hooks);
};
