"use strict";

var _index = require("./server/index");

var _services = require("./services");

var _configs = require("./configs");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function testDB() {
  return _testDB.apply(this, arguments);
}

function _testDB() {
  _testDB = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
    var _yield$dbConnect, dbClean, movies;

    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _services.crawlMovies)();
            _context.next = 3;
            return (0, _configs.dbConnect)(_configs.env.uri);

          case 3:
            _yield$dbConnect = _context.sent;
            dbClean = _yield$dbConnect.dbClean;
            _context.next = 7;
            return _models.Movie.find({}).skip(1).limit(10);

          case 7:
            movies = _context.sent;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _testDB.apply(this, arguments);
}

testDB(); // main();
//# sourceMappingURL=index.js.map