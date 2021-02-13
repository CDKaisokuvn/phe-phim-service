"use strict";

var _index = require("./server/index");

var _services = require("./services");

var _configs = require("./configs");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
// async function testDB() {
//     crawlMovies()
//     const { dbClean } = await dbConnect(env.uri);
//     // await dbClean();
//     const movies = await Movie.find({}).skip(1).limit(10);
//     //await getMovieSrc(movies[1]);
//     // const movie = await Movie.findById(movies[1]._id);
//     // console.log(movie);
// }
// testDB();
(0, _index.main)();
//# sourceMappingURL=index.js.map