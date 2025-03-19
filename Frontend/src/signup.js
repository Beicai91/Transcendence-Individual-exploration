"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signupForm = document.getElementById("signupForm");
const usrNmSignUp = document.getElementById("usrNmSignUp");
const passSignUp = document.getElementById("passSignUp");
const signupBtn = document.getElementById("signupBtn");
const errSignUp = document.getElementById("errSignUp");
signupForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
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
            window.location.href = "./index.html";
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
