//This modules defines how hTTP requests are routed to specific handlers
//Traditional MVC sometimes put `userRoutes` module in a separated `routes` folder 
import routeHandlers from '../controllers/routeHandlers.js'

async function userRoutes(fastify, option)
{
    fastify.get('/', routeHandlers.indexHandler);
    fastify.post('/signup', routeHandlers.signupHandler);
    fastify.post('/login', routeHandlers.loginHandler);
}

//In ESM, `export default` is the standard way to export a single value from the module
export default userRoutes;