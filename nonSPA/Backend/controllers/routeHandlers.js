//This module implements business logic for routes. Route handlers call the appropriate Model function to handle data when needed
import { addUser, findUser } from '../models/dbOperations.js'

async function signupHandler(request, reply)
{
    const { username, password } = request.body;
    //test
    console.log("IN SIGNUPHANDLER");
    console.log("Received request body:", request.body);console.log("Type of request.body:", typeof request.body);
    console.log("Keys in request.body:", Object.keys(request.body));
    console.log("USERNAME: ", request.body.username);
    console.log("PASSWORD: ", request.body.password);
    //
    const res = await addUser(request.server.sqlite, username, password);

    //test
    console.log("Adduser result: ");
    console.log(res);
    //
    if (res.success)
        return reply.send(res);
    else
        return reply.status(400).send(res);
    //`res` is a promise. We can also do `return (res)` directly cause Fastify will resolve it automatically and send the response back. But if we want to modify response status, we can't do directly `return (res)` as in `else` part
}

async function loginHandler(request, reply)
{
    const { username, password } = request.body;
    const user = await findUser(request.server.sqlite, username, password);

    if (user)
        return reply.send({ message: 'Login successful', user});
    else
        return reply.status(401).send({ error: 'Invalid credenials' })
}

async function homeHandler(request, reply)
{
    return reply.sendFile('index.html');
}

const routeHandlers = {
    signupHandler,
    loginHandler,
    homeHandler
};

export default routeHandlers;

//In route handlers, Fastify doesn't pass the `fastify` object directly. The Fastify instance (`fastify`) is available as `request.server`. 
//Fastify makes what's decorated (`fastify.decorate()`) available in every request through `request.server.xxx`