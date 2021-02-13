"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crawlMovies = crawlMovies;
Object.defineProperty(exports, "getMovieSrc", {
  enumerable: true,
  get: function get() {
    return _movie.getMovieSrc;
  }
});

var _movie = require("./movie");

var _ioredis = _interopRequireDefault(require("ioredis"));

var _kue = _interopRequireDefault(require("kue"));

var _configs = require("../configs");

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function crawlMovies() {
  return _crawlMovies.apply(this, arguments);
}

function _crawlMovies() {
  _crawlMovies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var queue, _loop, i;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queue = _kue["default"].createQueue({
              redis: {
                createClientFactory: function createClientFactory() {
                  return new _ioredis["default"]();
                }
              }
            });
            _context3.next = 3;
            return (0, _configs.dbConnect)(_configs.env.uri);

          case 3:
            _loop = function _loop(i) {
              var job = queue.create("crawl-list-movie", {
                page: i
              }).save(function (err) {
                if (err) console.log(err);
                console.log(job.id);
              });
            };

            for (i = 1; i <= 270; i++) {
              _loop(i);
            }

            queue.process("crawl-list-movie", 10, /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(job, done) {
                var list, list_updated;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _movie.getListMovies)(job.data.page);

                      case 2:
                        list = _context2.sent;
                        _context2.next = 5;
                        return Promise.all(list.map( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(movie) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return (0, _movie.updateMovieDetail)(movie);

                                  case 2:
                                    return _context.abrupt("return", _context.sent);

                                  case 3:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x3) {
                            return _ref2.apply(this, arguments);
                          };
                        }()));

                      case 5:
                        list_updated = _context2.sent;
                        list_updated = list_updated.filter(function (e) {
                          return !!e;
                        });
                        _context2.next = 9;
                        return _models.Movie.create(list_updated);

                      case 9:
                        done();

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }());

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _crawlMovies.apply(this, arguments);
}
//# sourceMappingURL=index.js.map