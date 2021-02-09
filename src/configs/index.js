import "dotenv/config";

import { dbConnect } from "./db";

const env = {
    port: process.env.PORT || 5000,
    uri: process.env.DB_URI,
};

export { dbConnect, env };
