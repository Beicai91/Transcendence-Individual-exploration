//Get form and input fields
//`as HTMLFormElement` is required by ts so that the compiler knows what type the lement is
const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const usrnameInput = document.getElementById("username") as HTMLFormElement;
const passInput = document.getElementById("password") as HTMLFormElement;
const errMsg = document.getElementById("errorMessage") as HTMLFormElement;
const loginBtn = document.getElementById("loginBtn") as HTMLFormElement;

//Listen for form submission
//listener function is async as `fetch()` may take time. If `fetch()` took 10s, the whole browser would freeze (ex. user can't close the page etc.)
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); //By default, when a form is submitted, the page reloads. Without `preventDefault()`, the browser refreshes and user won't see any error msg in case of err

    //Get user input values
    const username = usrnameInput.value.trim();
    const password = passInput.value.trim();

    //Validate input values
    if (!username || !password)
    {
        errMsg.textContent = "Please fill in all fields.";
        errMsg.classList.remove("hidden");
        return;
    }

    //Send login request to backend
    try
    {
        const response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password})
        });

        loginBtn.textContent = "Loading...";

        if (response.ok)
            window.location.href = "./home.html"; //`window` is the global object for everything in browser. `window.location.href` is the current page URL
        else
        {
            errMsg.textContent = "Invalid username or password.";
            errMsg.classList.remove("hidden");
            loginBtn.textContent = "Login";
        }
    }
    catch (error)
    {
        console.error("Error:", error);
        errMsg.textContent = "Something went wrong. Please try again.";
        errMsg.classList.remove("hidden");
    }
});