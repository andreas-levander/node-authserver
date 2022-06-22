db = new Mongo().getDB("authdb");

db.createUser({
  user: "testuser",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "authdb",
    },
  ],
});

db.createCollection("users");

db.users.insert({
  username: "admin",
  passwordHash: "$2b$10$XswkwWIkGxW7plojhU6Q7u5ITSXJS38fwPBbPZRUKHxXBwPNLSRjy",
  roles: ["admin"],
});
