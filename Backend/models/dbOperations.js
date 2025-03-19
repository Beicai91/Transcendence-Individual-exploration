//This module takes care of creating user data table, adding user data, query user data

async function setupUserTable(db)
{
    //test
    console.log("Ready to set up user table");
    //
    //`exec()` executes a SQL command. Create users table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        )
    `)
}

async function addUser(db, username, password)
{
    //test
    console.log("IN ADDUSER");
    console.log(`USERNAME ${username}`);
    console.log(`PASSWORD ${password}`);
    //
    try
    {
        const statement = await db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        await statement.run(username, password);
        return { success: true, message: 'User registered successfully' };
    }
    catch (err)
    {
        //test
        console.log("catched error");
        //
        return { success: false, error: 'Username already exists' };
    }
}

async function findUser(db, username, password)
{

    const statement = await db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const res = await statement.get(username, password); //`res` is either the user object { id, username, password } or undefined. `statement.get()` doesn't throw error
    return (res);
}

//This is named exports. To import, we need to use function names
export { setupUserTable, addUser, findUser}

//A SQL Statement Object is an intermediate representation of a SQL command that has been prepared but not yet executed.
//A SQL query string is a SQL command, but with placeholders (`?`) for values. We pass a SQL query string to functions like `db.prepare()` to create a SQL statement object
//`db.prepare()` takes a SQL query string with placeholders (`?`) and returns a prepared SQL statement object that can be executed after (with `run()`, `get()`))
/*
// Step 1: Define the SQL query string
const sql = "INSERT INTO users (username, password) VALUES (?, ?)"

// Step 2: Prepare it into a statement object
const stmt = await db.prepare(sql)

// Step 3: Execute it with values
await stmt.run("Alice", "secure123")
await stmt.run("Bob", "password456")
*/

//To learn: SQL command format