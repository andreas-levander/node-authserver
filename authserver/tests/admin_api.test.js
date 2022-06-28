import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/User.js";

const api = supertest(app);

const login = async (username, password) => {
  const res = await api.post("/v1/api/public/login").send({
    username,
    password,
  });
  return res.body.token;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

beforeEach(async () => {
  await User.deleteMany({});

  //creates new admin user with password admin
  const admin = new User({
    username: "testadmin",
    passwordHash:
      "$2b$10$XswkwWIkGxW7plojhU6Q7u5ITSXJS38fwPBbPZRUKHxXBwPNLSRjy",
    roles: ["admin"],
  });

  await admin.save();
});

test("admin can create new user", async () => {
  const token = await login("testadmin", "admin");

  const response = await api
    .post("/v1/api/admin/createuser")
    .set("Authorization", `bearer ${token}`)
    .send({ username: "testuser", roles: ["user"] });

  const { status, body } = response;

  expect(status).toEqual(200);
  expect(body.newuser.username).toBe("testuser");
  expect(body.newuser.roles).toContain("user");

  const usersAtEnd = await usersInDb();

  expect(usersAtEnd).toHaveLength(2);
});

test("admin can remove user", async () => {
  const token = await login("testadmin", "admin");

  await api
    .post("/v1/api/admin/createuser")
    .set("Authorization", `bearer ${token}`)
    .send({ username: "testuser", roles: ["user"] });

  const added_user = await User.find({ username: "testuser" });

  const response = await api
    .post("/v1/api/admin/removeuser")
    .set("Authorization", `bearer ${token}`)
    .send({ username: "testuser" });

  expect(response.status).toEqual(200);
  const usersAtEnd = await usersInDb();

  expect(usersAtEnd).not.toContainEqual(added_user);
});

test("only admin can create users", async () => {
  const token = await login("testadmin", "admin");

  const res = await api
    .post("/v1/api/admin/createuser")
    .set("Authorization", `bearer ${token}`)
    .send({ username: "testuser", roles: ["user"] });

  const usertoken = await login("testuser", res.body.newuser.password);

  const response = await api
    .post("/v1/api/admin/createuser")
    .set("Authorization", `bearer ${usertoken}`)
    .send({ username: "testuser", roles: ["admin"] });

  expect(response.status).toEqual(401);

  const usersAtEnd = await usersInDb();

  expect(usersAtEnd).toHaveLength(2);
});

test("only admin can remove users", async () => {
  const token = await login("testadmin", "admin");

  const res = await api
    .post("/v1/api/admin/createuser")
    .set("Authorization", `bearer ${token}`)
    .send({ username: "testuser", roles: ["user"] });

  const usertoken = await login("testuser", res.body.newuser.password);

  const response = await api
    .post("/v1/api/admin/removeuser")
    .set("Authorization", `bearer ${usertoken}`)
    .send({ username: "testadmin" });

  expect(response.status).toEqual(401);

  const usersAtEnd = await usersInDb();

  expect(usersAtEnd).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
});
