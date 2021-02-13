"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnect = dbConnect;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function dbConnect(_x) {
  return _dbConnect.apply(this, arguments);
}

function _dbConnect() {
  _dbConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uri) {
    var dbClean, _dbClean;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _dbClean = function _dbClean3() {
              _dbClean = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _mongoose["default"].connection.db.dropDatabase();

                      case 2:
                        console.log("Done");

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _dbClean.apply(this, arguments);
            };

            dbClean = function _dbClean2() {
              return _dbClean.apply(this, arguments);
            };

            _context2.next = 4;
            return _mongoose["default"].connect(uri, {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 4:
            return _context2.abrupt("return", {
              dbClean: dbClean
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _dbConnect.apply(this, arguments);
}
//# sourceMappingURL=db.js.map