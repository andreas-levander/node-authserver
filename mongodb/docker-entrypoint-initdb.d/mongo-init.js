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
