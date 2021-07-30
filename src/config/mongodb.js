import { MongoClient } from "mongodb";
//e4Q5WUOWu23Wheej
import { env } from "*/config/environment.js";

let dbInstance = null;

export const connectDB = async () => {
    const client = new MongoClient(env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    dbInstance = client.db(env.DATABASE_NAME);
};
// const listDatabase = async (client) => {
//     const databasesList = await client.db().admin().listDatabases();
//     console.log(databasesList);
//     databasesList.databases.forEach((db) => {
//         console.log(db.name);
//     });
// };

//Get database instance
export const getDB = () => {
    if (!dbInstance) throw new Error("Must connect to Database first");
    return dbInstance;
};
