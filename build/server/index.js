"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _configs = require("../configs");

var _models = require("../models");

var _constant = require("./constant");

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _yield$dbConnect, dbClean, app;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _configs.dbConnect)(_configs.env.uri);

          case 2:
            _yield$dbConnect = _context2.sent;
            dbClean = _yield$dbConnect.dbClean;
            app = (0, _express["default"])();
            app.use(_express["default"].json());
            app.use((0, _helmet["default"])());
            app.use((0, _morgan["default"])("dev"));
            app.use((0, _cors["default"])()); // eslint-disable-next-line no-unused-vars

            app.get("/", function (req, res, next) {
              return res.status(200).json({
                msg: "OK"
              });
            });
            app.get("/api/v1/service-movie/:id", /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
                var id, movie;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        id = req.params.id;
                        _context.next = 4;
                        return _models.Movie.find(id);

                      case 4:
                        movie = _context.sent;

                        if (movie) {
                          _context.next = 7;
                          break;
                        }

                        throw new _constant.HttpError("Could not find movie with id ".concat(id), 404);

                      case 7:
                        _context.next = 9;
                        return (0, _services.getMovieSrc)(movie);

                      case 9:
                        return _context.abrupt("return", res.status(200).json({
                          msg: "ok"
                        }));

                      case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](0);
                        next(_context.t0);

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 12]]);
              }));

              return function (_x, _x2, _x3) {
                return _ref.apply(this, arguments);
              };
            }());
            app.use(function (req, res, next) {
              var error = new _constant.HttpError("Not Found", 404);
              next(error);
            }); // eslint-disable-next-line no-unused-vars

            app.use(function (err, req, res, next) {
              var status = err.status ? err.status : 500;
              return res.status(status).json({
                msg: err.message
              });
            });
            app.listen(_configs.env.port, function () {
              return console.log("Server is running on port: ".concat(_configs.env.port));
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}
//# sourceMappingURL=index.js.map