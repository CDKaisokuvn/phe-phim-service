import request from "request-promise";
import cheerio from "cheerio";
import { slug } from "../utils";
import puppeteer from "puppeteer";

export async function updateMovieDetail(movie) {
    const response = await request.get(movie.link);
    const $ = await cheerio.load(response);
    movie.trailer = $("iframe").attr("src");
    movie.description = $("p.content-h").text();
    movie.categories = $(".info-y li").eq(-5).text().split(":")[1];
    movie.slug_cats = (movie.categories && slug(movie.categories)) || "";
    movie.times = $(".info-y li").eq(-3).text().split(":")[1];
    movie.views =
        +$(".info-y li")
            .eq(-2)
            .text()
            .split(":")[1]
            .trim()
            .replace(",", "")
            .replace("'", "")
            .replace('"', "") || 0;
    movie.year = $(".info-y li").eq(-1).text().split(":")[1];
    movie.country = $(".info-y li").eq(-4).text().split(":")[1];
    movie.actors = $(".info-y li").eq(-6).text().split(":")[1];
    movie.director = $(".info-y li").eq(-7).text().split(":")[1];
    movie.rating = +$("#average").text().trim();

    movie.rating_count = +$("#rate_count").text().trim() || 0;
    if (movie.link === $("a.btn-see.btn.btn-danger").attr("href")) {
        return null;
    } else {
        movie.link = $("a.btn-see.btn.btn-danger").attr("href");
        return movie;
    }
}

export async function getListMovies(page) {
    const baseURL = `https://bilutvzz.net/phim-le//trang-${page}`;
    const response = await request.get(baseURL);

    const $ = await cheerio.load(response);
    const list = [];
    // eslint-disable-next-line no-unused-vars
    $("li.film-item").each(function (i, e) {
        const title = $(this).find("p.name").text();
        const subtitle = $(this).find("p.real-name").text();
        const img = $(this).find(".list-img").attr("style").slice(21, -2);
        const link = $(this).find("a").attr("href");

        list.push({ title, subtitle, img, link });
    });
    return list;
}

export async function getMovieSrc(movie) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    console.log("Start");
    await page.goto(movie.link, {
        waitUntil: "networkidle2",
    });
    movie.src = await page.evaluate(() => {
        // eslint-disable-next-line no-undef
        return document.querySelector("iframe").getAttribute("src");
    });
    await movie.save();
    await browser.close();
}
