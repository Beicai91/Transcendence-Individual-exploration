//HASH_BASED ROUTING
import { homeComponent } from "./components/homeComponent.js"
import { loginComponent } from "./components/loginComponent.js"
import { signupComponent } from "./components/signupComponent.js"
//`Record<K, V>`: a typescript utility like that acts like a dictionary (or object in js)
//K: route V: a function that takes the root container where we inject the component and has no return value
const routes: Record<string, (root: HTMLElement) => void> = {
    "/": loginComponent,
    "/login": loginComponent,
    "/signup": signupComponent,
    "/home": homeComponent,
};

//Explicitely specifying parameter types in TypeScript is recommended
function render(root: HTMLElement) {
    //get #fragment part(called the "hash") of URL and remove `#`. If there is no #fragment part, path defaults to `"/"`
    const path = window.location.hash.replace("#", "") || "/";
    /* equivalent to
    let hashFrag = window.location.hash;
    const path;
    if (hashFrag)
        path = hashFrag.replace("#", "");
    else
        path = "/";
    */

    //test
    console.log(`In render, current path is ${path}`);
    //
    const component = routes[path];
    if (component)
        component(root);
    else
        root.innerHTML = `<h2>404 - Not Found</h2>`;
}

function initRouter(root: HTMLElement)
{
    //event listener always calls the function by passing an `event` object to the function. So we need to wrap `render()` into an anonymous function
    window.addEventListener("hashchange", (event) => render(root));
    //run `render()` for rendering page for current URL
    render(root);
}

export { initRouter };