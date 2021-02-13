"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMovieDetail = updateMovieDetail;
exports.getListMovies = getListMovies;
exports.getMovieSrc = getMovieSrc;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _utils = require("../utils");

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function updateMovieDetail(_x) {
  return _updateMovieDetail.apply(this, arguments);
}

function _updateMovieDetail() {
  _updateMovieDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(movie) {
    var response, $;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _requestPromise["default"].get(movie.link);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return _cheerio["default"].load(response);

          case 5:
            $ = _context.sent;
            movie.trailer = $("iframe").attr("src");
            movie.description = $("p.content-h").text();
            movie.categories = $(".info-y li").eq(-5).text().split(":")[1];
            movie.slug_cats = movie.categories && (0, _utils.slug)(movie.categories) || "";
            movie.times = $(".info-y li").eq(-3).text().split(":")[1];
            movie.views = +$(".info-y li").eq(-2).text().split(":")[1].trim().replace(",", "").replace("'", "").replace('"', "") || 0;
            movie.year = $(".info-y li").eq(-1).text().split(":")[1];
            movie.country = $(".info-y li").eq(-4).text().split(":")[1];
            movie.actors = $(".info-y li").eq(-6).text().split(":")[1];
            movie.director = $(".info-y li").eq(-7).text().split(":")[1];
            movie.rating = +$("#average").text().trim();
            movie.rating_count = +$("#rate_count").text().trim() || 0;

            if (!(movie.link === $("a.btn-see.btn.btn-danger").attr("href"))) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", null);

          case 22:
            movie.link = $("a.btn-see.btn.btn-danger").attr("href");
            return _context.abrupt("return", movie);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateMovieDetail.apply(this, arguments);
}

function getListMovies(_x2) {
  return _getListMovies.apply(this, arguments);
}

function _getListMovies() {
  _getListMovies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
    var baseURL, response, $, list;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseURL = "https://bilutvzz.net/phim-le//trang-".concat(page);
            _context2.next = 3;
            return _requestPromise["default"].get(baseURL);

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return _cheerio["default"].load(response);

          case 6:
            $ = _context2.sent;
            list = []; // eslint-disable-next-line no-unused-vars

            $("li.film-item").each(function (i, e) {
              var title = $(this).find("p.name").text();
              var subtitle = $(this).find("p.real-name").text();
              var img = $(this).find(".list-img").attr("style").slice(21, -2);
              var link = $(this).find("a").attr("href");
              list.push({
                title: title,
                subtitle: subtitle,
                img: img,
                link: link
              });
            });
            return _context2.abrupt("return", list);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getListMovies.apply(this, arguments);
}

function getMovieSrc(_x3) {
  return _getMovieSrc.apply(this, arguments);
}

function _getMovieSrc() {
  _getMovieSrc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(movie) {
    var browser, page;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _puppeteer["default"].launch({
              args: ["--no-sandbox"]
            });

          case 2:
            browser = _context3.sent;
            _context3.next = 5;
            return browser.newPage();

          case 5:
            page = _context3.sent;
            console.log("Start");
            _context3.next = 9;
            return page["goto"](movie.link, {
              waitUntil: "networkidle2"
            });

          case 9:
            _context3.next = 11;
            return page.evaluate(function () {
              // eslint-disable-next-line no-undef
              return document.querySelector("iframe").getAttribute("src");
            });

          case 11:
            movie.src = _context3.sent;
            _context3.next = 14;
            return movie.save();

          case 14:
            _context3.next = 16;
            return browser.close();

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getMovieSrc.apply(this, arguments);
}
//# sourceMappingURL=movie.js.map