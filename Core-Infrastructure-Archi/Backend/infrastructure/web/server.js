//Entry point of the app. Registers everything and start the server
import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'
import sqliteConnector from '../db/dbSetUp.js'
import userRoutes from './routing/userRoutes.js'
import { setupUserTable } from '../db/dbSetUp.js'

const fastify = Fastify({logger:true});

//Initialize customized plugin(it's actually calling `sqliteConnector` to set up the database connection and add the `db` property to fastify instance). Now we can access SQLite database everywhere with `fastify.sqlite`
fastify.register(sqliteConnector);


//Fastify registers plugins asynchronously. We can't garantee `sqliteConnector.js` is ready immediately after `fastify.register()`. `fastify.after()` waits until SQLite is ready
fastify.after(async () => {
    //test
    console.log("Fastify after is running");
    //
    await setupUserTable(fastify.sqlite);
});


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