//Entry point of the app. Registers everything and start the server
import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'
import sqliteConnector from './models/sqliteConnector.js'
import userRoutes from './routes/userRoutes.js'
import { setupUserTable } from './models/dbOperations.js'

const fastify = Fastify({logger:true});

//Initialize customized plugin(it's actually calling `sqliteConnector` to set up the database connection and add the `db` property to fastify instance). Now we can access SQLite database everywhere with `fastify.sqlite`
fastify.register(sqliteConnector);


//Fastify registers plugins asynchronously. `fastify.after(callback)` ensures that all previously registered plugins have finished before running the callback. We can't garantee database connection is ready immediately after `fastify.register(sqliteConnector)`. `fastify.after()` waits until database connection is ready
fastify.after(async () => {
    await setupUserTable(fastify.sqlite);
});


//register `@fastify/static` plugin, allowing Fastify to serve static files
//Serve `Frontend/src/` for frontend files
fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), '../Frontend/src'),
    prefix: '/',
})

//Fastify treats `userRoutes` as a "plugin-like" module that defines routes. But `userRoutes` is not a plugin.
//Advantages of registering `userRoutes` instead of calling it directly by doing `userRoutes(fastify)`
//1. Encapsulation. 2. async/await support
//Ex. if we want to add prefix to all the routes, we can do `fastify.register(userRoutes, { prefix: '/users' })` instead of adding prefix to each route inside `userRoutes()` function.
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