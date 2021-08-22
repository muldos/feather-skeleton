const volume = require('./volume/volume.service.js');
const softapp = require('./softapp/softapp.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(volume);
  app.configure(softapp);
};
