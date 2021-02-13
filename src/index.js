/* eslint-disable no-unused-vars */
import { main } from "./server/index";
import { crawlMovies, getMovieSrc } from "./services";

import { dbConnect, env, dbClean } from "./configs";
import regeneratorRuntime from "regenerator-runtime";
import { Movie } from "./models";

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

main();
