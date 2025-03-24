import sqlite3 from "sqlite3"
import { open } from "sqlite"
import fastifyPlugin from "fastify-plugin"
import { dirname, resolve } from "path"
import { fileURLToPath } from 'url'

async function sqliteConnector(fastify, options)
{
    //get the absolute path of the current file (dbSetUp.js)
    const __filename = fileURLToPath(import.meta.url);
    //get the absolute path of the current directory where `dbSetUp.js` is located
    const __dirname = dirname(__filename);

    //test
    console.log("__filename: ", __filename);
    console.log("__dirname: ", __dirname);
    //

    //resolve path
    const dbPath = resolve(__dirname, 'database', 'database.db');

    const db = await open({
        filename: dbPath, //the path is is relative the current working directory (current working directory: It is the folder you are in when we run the node command — regardless of where the script we're executing is located.)
        //filename: './infrastructure/db/database/database.db', -> this only works when we run `node ...` in `Backend` folder. NOT FLEXIBLE
        driver: sqlite3.Database
    })

    // Attach `db` to Fastify with the name`sqlite` (we can use any other name as we want)
    fastify.decorate('sqlite', db);

    //close the database connection when the server stops
    fastify.addHook('onClose', async (fastify, done) => {
        await db.close();
        done();
    })
}

async function setupUserTable(db)
{
    //`exec()` executes a SQL command. Create users table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        )
    `)
}

export { setupUserTable };
export default fastifyPlugin(sqliteConnector);

/*
Relative paths in Node are always relative to where we run node, not where the script lives.
Use path.resolve(__dirname, 'relative/path') if we want safe file access regardless of how Node was launched.
*/