var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loginComponent(root) {
    root.innerHTML = `
        <h2 class="text-2xl font-semibold text-center text-gray-700">Login</h2>

        <form id="loginForm" class="mt-6">
            <div>
                <lable for="username" class="block text-sm font-medium text-gray-700">Username</lable>
                <input type="username" id="username" class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none" required>
            </div>

            <div class="mt-4">
                <lable for="password" class="block text-sm font-medium text-gray-700">Password</lable>
                <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none" required>
            </div>

            <button type="submit" id="loginBtn" class="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Login</button>
                
            <p id="errorMessage" class="mt-4 text-red-500 text-sm text-center hidden">Invalid username or password.</p>
        </form>

        <div class="mt-4 text-center">
            <p>No account? <a href="#/signup" class="underline text-blue-600 hover:text-blue-800">Sign up</a></p>
        </div>
    `;
    const loginForm = document.getElementById("loginForm");
    const usrnameInput = document.getElementById("username");
    const passInput = document.getElementById("password");
    const errMsg = document.getElementById("errorMessage");
    const loginBtn = document.getElementById("loginBtn");
    loginForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        //Get user input values
        const username = usrnameInput.value.trim();
        const password = passInput.value.trim();
        //Validate input values
        if (!username || !password) {
            errMsg.textContent = "Please fill in all fields.";
            errMsg.classList.remove("hidden");
            return;
        }
        //Send login request to backend
        try {
            const response = yield fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            loginBtn.textContent = "Loading...";
            if (response.ok)
                window.location.href = "#/home";
            else {
                errMsg.textContent = "Invalid username or password.";
                errMsg.classList.remove("hidden");
                loginBtn.textContent = "Login";
            }
        }
        catch (error) {
            console.error("Error:", error);
            errMsg.textContent = "Something went wrong.     Please try again.";
            errMsg.classList.remove("hidden");
        }
    }));
}
export { loginComponent };
