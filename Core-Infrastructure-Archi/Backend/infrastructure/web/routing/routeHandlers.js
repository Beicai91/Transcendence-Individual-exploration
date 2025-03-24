//This module implements different route handlers
import { UsrRepoSql } from "../../repositories/UsrRepoSql.js"
import { User }  from "../../../core/domain/User.js"
import { AuthService } from "../../../core/services/AuthService.js"


async function signupHandler(request, reply)
{
    const { username, password } = request.body;
    const user = new User(username, password);
    const userRepo = new UsrRepoSql(request.server.sqlite);
    const authService = new AuthService(user, userRepo);

    const res = await authService.signup();

    if (res)
        return reply.send({ success: true, message: 'User registered successfully' });
    else
        return reply.status(400).send({ success: false, error: 'User name already exists'});
    //`res` is a promise. We can also do `return (res)` directly cause Fastify will resolve it automatically and send the response back. But if we want to modify response status, we can't do directly `return (res)` as in `else` part
}

async function loginHandler(request, reply)
{
    const { username, password } = request.body;
    const user = new User(username, password);
    const userRepo = new UsrRepoSql(request.server.sqlite);
    const authService = new AuthService(user, userRepo);

    const res = await authService.login();

    if (res)
    {
        user.setStateToLogin();
        return reply.send({ message: 'Login successful', user});
    }
    else
        return reply.status(401).send({ error: 'Invalid credenials' });
    
}

async function indexHandler(request, reply)
{
    //test
    console.log("IN INDEX HANDLER");
    //
    return reply.sendFile('index.html');
}

const routeHandlers = {
    signupHandler,
    loginHandler,
    indexHandler
};

export default routeHandlers;

//In route handlers, Fastify doesn't pass the `fastify` object directly. The Fastify instance (`fastify`) is available as `request.server`. 
//Fastify makes what's decorated (`fastify.decorate()`) available in every request through `request.server.xxx`