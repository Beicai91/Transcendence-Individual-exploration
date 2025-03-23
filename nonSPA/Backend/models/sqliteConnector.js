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

    //Think of a Fastify instance as a class instance, and `decorate()` allows to add custom properties to the Fastify instance so that we can access the added property like accessing a class property everywhere in the application. Here we attach `db` to Fastify instance with the name`sqlite` (we can use any other name as we want) so that everywhere in our application we can access SQLite database with `fastify.sqlite`
    fastify.decorate('sqlite', db);

    //close the database connection when the server stops
    fastify.addHook('onClose', async (fastify, done) => {
        await db.close();
        done();
    })
}

export default fastifyPlugin(sqliteConnector); //transform `sqliteConnector` function to a proper Fastify plugin so that we can reuse this plugin also in other fastify applications. But if we have no intention of reusing `sqliteConnector` in other applications, this's not necessary. We can just call `sqliteConnector()` to make the database connection.