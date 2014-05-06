// Generated by CoffeeScript 1.7.1
(function() {
  var makeJade;

  makeJade = function(root) {
    return function(req, res, next) {
      var file, fs, jade, path;
      fs = require("fs");
      path = require("path");
      jade = require("jade");
      if (path.extname(req.url) !== ".html") {
        next();
        return;
      }
      file = path.join(root, req.url);
      if (fs.existsSync(file)) {
        res.end(file);
      } else {
        file = path.join(root, path.basename(req.url, ".html") + ".jade");
        if (fs.existsSync(file)) {
          return fs.readFile(file, {
            encoding: "utf8"
          }, function(err, data) {
            if (err) {
              throw err;
              next();
            } else {
              jade.render(data, function(err, html) {
                if (err) {
                  throw err;
                  return next();
                } else {
                  res.setHeader("Content-Length", html.length);
                  res.setHeader("Content-Type", "text/html; charset=UTF-8");
                  return res.end(html);
                }
              });
            }
          });
        } else {
          res.statusCode = 404;
          return res.end();
        }
      }
    };
  };

  module.exports = makeJade;

}).call(this);