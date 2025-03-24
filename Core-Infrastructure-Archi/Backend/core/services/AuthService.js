//`AuthService` is decoupled. It can be initialized with any `userRepo` we pass in (it doesn't matter which tech we use to concretely implement UserRepository in `UsrRepoSql.js of the infrastructure part)
import { User } from "../domain/User.js"

class AuthService {
    //@param user: User object
    constructor(user, userRepo)
    {
        this.user = user;
        this.userRepo = userRepo;
    }

    async signup()
    {
        const newUser = new User(this.user.getUserName(), this.user.getUserPass());
        const res = await this.userRepo.addUser(newUser);
        if (res)
            newUser.setStateToSignup();
        return (res);
    }

    async login()
    {
        const res = await this.userRepo.findUser(this.user);
        return (res);
    }

    signout()
    {
        this.user.setStateToLogout();
        return (true);
    }
}

export { AuthService };