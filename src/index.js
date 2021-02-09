import { crawlMovies } from "./services";

import { dbConnect, env, dbClean } from "./configs";
import { Movie } from "./models";

async function testDB() {
    // crawlMovies()
    const { dbClean } = await dbConnect(env.uri);
    // await dbClean();

    const movies = await Movie.find({}).skip(1).limit(10);
    console.log(movies);
}

testDB();
