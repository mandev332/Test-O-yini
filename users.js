let fs = require("fs");
let user = fs.readFileSync("users.json", "utf-8");
let users = user ? JSON.parse(user) : [];
console.table(users);
