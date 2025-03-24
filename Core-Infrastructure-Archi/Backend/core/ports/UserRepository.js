//Interface(aka "ports") that serves as a bridge between core and the outside
//We'll use functions declared here to get what we need from the outside(like database). The implementation of these functions will be in infrastructure
//JS doesn't have built-in interface support like TS, we can use an abstract base class

class UserRepository {
    //@param {User} user
    //return value is a boolean
    async findUser(user)
    {
        throw new Error("findUser() must be implemented");
    }

    //@param {User} user
    //return value is a boolean
    async addUser(user)
    {
        throw new Error("addUser() must be implemented");
    }
}

//test
console.log("Exporting UserRepository...");
//
export { UserRepository };