"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = void 0;

var _mongoose = require("mongoose");

//Phim le
var movieSchema = new _mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  subtitle: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  director: {
    type: String,
    require: true
  },
  trailer: {
    type: String,
    require: true
  },
  poster: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  src: {
    type: String,
    require: true
  },
  //link to scrap data
  link: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    require: true,
    "default": 0
  },
  rating_count: {
    type: Number,
    require: true,
    "default": 0
  },
  comments: {
    type: []
  },
  categories: {
    type: String
  },
  slug_cats: {
    type: String
  },
  actors: {
    type: String
  },
  views: {
    type: Number
  },
  year: {
    type: String
  },
  times: {
    type: String
  },
  country: {
    type: String
  }
}, {
  timestamps: true
});
var Movie = (0, _mongoose.model)("Movie", movieSchema);
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map