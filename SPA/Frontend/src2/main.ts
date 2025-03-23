import { initRouter } from "./router.js"
//`DOMContentLoaded` represens the event where the initial HTML document consisting of everything in the HTML file except for externally linked rscs such as stylesheets, images and other assets is loaded
const root = document.getElementById("app");
if (!root)
    throw new Error("Root element is not found");
else
{
    //test
    console.log("GOT ROOT for future injections");
    //
    window.addEventListener("DOMContentLoaded", () => {
    initRouter(root);
})
}