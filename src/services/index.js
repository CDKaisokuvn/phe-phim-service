import { getListMovies, updateMovieDetail, getMovieSrc } from "./movie";
import Redis from "ioredis";
import kue from "kue";

import { dbConnect, env } from "../configs";
import { Movie } from "../models";

const queue = kue.createQueue({
    redis: {
        createClientFactory: function () {
            return new Redis();
        },
    },
});

export async function crawlMovies() {
    console.log(env.uri);
    await dbConnect(env.uri);
    for (let i = 1; i <= 270; i++) {
        const job = queue
            .create("crawl-list-movie", { page: i })
            .save(function (err) {
                if (err) console.log(err);
                console.log(job.id);
            });
    }

    queue.process("crawl-list-movie", 10, async function (job, done) {
        const list = await getListMovies(job.data.page);
        let list_updated = await Promise.all(
            list.map(async (movie) => {
                return await updateMovieDetail(movie);
            }),
        );
        list_updated = list_updated.filter((e) => !!e);
        await Movie.create(list_updated);
        done();
    });
}

export { getMovieSrc };
