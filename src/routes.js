const exportFile = require('./export-file');

const routes = (app) => {
  app.use('/api/export-file', exportFile);
};

module.exports = routes;
