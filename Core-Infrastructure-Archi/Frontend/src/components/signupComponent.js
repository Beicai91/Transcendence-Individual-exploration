var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function signupComponent(root) {
    root.innerHTML = `
        <h2 class="text-2xl font-semibold text-center text-gray-700">Signup</h2>

        <form id="signupForm" class="mt-6">
            <div>
                <lable for="username" class="block text-sm font-medium text-gray-700">Username</lable>
                    <input type="username" id="usrNmSignUp" class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none" required>
            </div>

            <div class="mt-4">
                <lable for="password" class="block text-sm font-medium text-gray-700">Password</lable>
                <input type="password" id="passSignUp" class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none" required>
            </div>

            <button type="submit" id="signupBtn" class="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Signup</button>

            <p id="errSignUp" class="mt-4 text-red-500 text-sm text-center hidden">Invalid username or password.</p>
         </form>
        
         <div class="mt-4 text-center">
            <p>Already have an account? <a href="#/login" class="underline text-blue-600 hover:text-blue-800">Login</a></p>
        </div>
    `;
    const signupForm = document.getElementById("signupForm");
    const usrNmSignUp = document.getElementById("usrNmSignUp");
    const passSignUp = document.getElementById("passSignUp");
    const signupBtn = document.getElementById("signupBtn");
    const errSignUp = document.getElementById("errSignUp");
    signupForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const username = usrNmSignUp.value.trim();
        const password = passSignUp.value.trim();
        //test
        console.log(`username ${username}`);
        console.log(`password ${password}`);
        //
        if (!username || !password) {
            errSignUp.textContent = "Please fill in all fields";
            errSignUp.classList.remove("hidden");
        }
        try {
            const response = yield fetch("http://127.0.0.1:3000/signup", {
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
                window.location.href = "#/login";
            else {
                errSignUp.textContent = "User already exists.";
                errSignUp.classList.remove("hidden");
                signupBtn.textContent = "Signup";
            }
        }
        catch (error) {
            console.error("Error:", error);
            errSignUp.textContent = "Something went wrong. Please try again.";
            errSignUp.classList.remove("hidden");
        }
    }));
}
export { signupComponent };
