// Generated by CoffeeScript 1.7.1
(function() {
  var createMiniHarp;

  createMiniHarp = function(path) {
    var app, argv, connect, jadePreprocessor, lessPreprocessor, port, serveStatic;
    connect = require("connect");
    app = connect();
    argv = require("minimist")(process.argv.slice(2));
    port = argv.port || 4000;
    serveStatic = require("serve-static");
    jadePreprocessor = require("./lib/processor/jade");
    lessPreprocessor = require("./lib/processor/less");
    app.use(function(req, res, next) {
      var url;
      url = req.url.split("/");
      if (url[1] === "current-time" && url[2] === void 0) {
        return res.end((new Date()).toISOString() + "\n");
      } else {
        return next();
      }
    }).use(serveStatic(path)).use(jadePreprocessor(path)).use(lessPreprocessor(path)).listen(port);
    console.log("Starting mini-harp on http://localhost:" + port);
    return app;
  };

  module.exports = createMiniHarp;

}).call(this);
