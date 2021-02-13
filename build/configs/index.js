"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dbConnect", {
  enumerable: true,
  get: function get() {
    return _db.dbConnect;
  }
});
exports.env = void 0;

require("dotenv/config");

var _db = require("./db");

var env = {
  port: process.env.PORT || 5000,
  uri: process.env.DB_URI
};
exports.env = env;
//# sourceMappingURL=index.js.map