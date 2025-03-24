import { UserRepository } from "../../core/ports/UserRepository.js"

class UsrRepoSql extends UserRepository
{
    constructor(db)
    {
        //A strict rule in js/ts when using ES6: In a class that extends another class, before accessing `this`, we need to call `super()` in the constructor.
        super();
        this.db = db;
    }

    //To seperate well core from infrastructure, what we return from `findUser()` and `addUser()` should not be depedent on the database tech we use
    //@override findUser() of UserRepository
    async findUser(user)
    {     
        const username = user.getUserName();
        const password = user.getUserPass();
        const statement = await this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
        const res = await statement.get(username, password); //`res` is either an object { id, username, password } or undefined. `statement.get()` doesn't throw error

        if (res)
            return (true);
        return (false);
    }

    //@override addUser() of UserRepository
    async addUser(user)
    {
        const username = user.getUserName();
        const password = user.getUserPass();
        try
        {
            const statement = await this.db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
            await statement.run(username, password);
            return (true);
        }
        catch (err)
        {
            return (false);
        }
    }
}

export { UsrRepoSql };