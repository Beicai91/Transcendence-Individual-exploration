//To use SQLite in Node.js, we need either `sqlite3` with the help of `open()` of `sqlite` package, or `better-sqlite3`(direct connection, work synchronously). 
// `sqlite3` and `better-sqlite3` are both Node.js libraries(packages) that allow us to interact with SQLite database
// `sqlite` is a Node.js package that acts as a helper for `sqlite3`, making it work with `async/await` instead of callbacks(it wraps `sqlite3` methods with Promises)
//In order to manage higher traffic of users, I choose `sqlite3`
import fastifyPlugin from 'fastify-plugin'
//@ts-ignore
import sqlite3 from 'sqlite3'
import { open } from 'sqlite' 

async function sqliteConnector(fastify, options)
{
    const db = await open({
        filename: './database/database.db',
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

export default fastifyPlugin(sqliteConnector);