//Entry point of the app. Registers everything and start the server
import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'
import sqliteConnector from './models/sqliteConnector.js'
import userRoutes from './routes/userRoutes.js'
import { setupUserTable } from './models/dbOperations.js'

const fastify = Fastify({logger:true});

//register SQLite. Now we can access SQLite database everywhere with `fastify.sqlite`
fastify.register(sqliteConnector);

//test
console.log("Registered sqlite in Fastify");
console.log(fastify.sqlite);
//

//Fastify registers plugins asynchronously. We can't garantee `sqliteConnector.js` is ready immediately after `fastify.register()`. `fastify.after()` waits until SQLite is ready
fastify.after(async () => {
    await setupUserTable(fastify.sqlite);
});

//test
console.log("User table set up in ./database/database.db");
//

//register `@fastify/static` plugin, allowing Fastify to serve static files
//Serve `Frontend/src/` for frontend files
fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), '../Frontend/src'),
    prefix: '/',
})
fastify.register(userRoutes);

async function start() {
    try
    {
        await fastify.listen({port:3000});
        console.log("Server started and is listening on port 3000");
    }
    catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();