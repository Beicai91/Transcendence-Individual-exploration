const signupForm = document.getElementById("signupForm") as HTMLFormElement;
const usrNmSignUp = document.getElementById("usrNmSignUp") as HTMLFormElement;
const passSignUp = document.getElementById("passSignUp") as HTMLFormElement;
const signupBtn = document.getElementById("signupBtn") as HTMLFormElement;
const errSignUp = document.getElementById("errSignUp") as HTMLFormElement;

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usrNmSignUp.value.trim();
    const password = passSignUp.value.trim();

    //test
    console.log(`username ${username}`);
    console.log(`password ${password}`);
    //

    if (!username || !password)
    {
        errSignUp.textContent = "Please fill in all fields";
        errSignUp.classList.remove("hidden");
    }

    try
    {
        const response = await fetch("http://127.0.0.1:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        signupBtn.textContent = "Signing up...";

        //test
        console.log("RESPONSE: ");
        console.log(response);
        //
        if (response.ok)
            window.location.href = "./index.html";
        else
        {
            errSignUp.textContent = "User already exists.";
            errSignUp.classList.remove("hidden");
            signupBtn.textContent = "Signup";
        }
    }
    catch(error)
    {
        console.error("Error:", error);
        errSignUp.textContent = "Something went wrong. Please try again.";
        errSignUp.classList.remove("hidden");
    }
});