//Entity User
//A user has a username and password. 
// It can be in two independant states:
// 1. signed up (isSignedUp)
// 2. logged in or logged out (isLoggedIn)
// Note: not using password hashing for now. passwords are stored in plain text for simplicity
class User {
    constructor(username, password, isLoggedIn = false, isSignedUp = false)
    {
        this.username = username;
        this.password = password;
        this.isLoggedIn = isLoggedIn;
        this.isSignedUp = isSignedUp;
    }
   
    getUserName()
    {
        return this.username;
    }

    getUserPass()
    {
        return this.password;
    }

    setStateToLogin()
    {
        this.isLoggedIn = true;
    }

    setStateToLogout()
    {
        this.isLoggedIn = false;
    }

    setStateToSignup()
    {
        this.isSignedUp = true;
    }
}

export { User };