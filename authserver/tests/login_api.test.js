import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/User.js";

const api = supertest(app);

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

test("admin can login", async () => {
  const response = await api
    .post("/v1/api/public/login")
    .send({ username: "testadmin", password: "admin" });

  expect(response.status).toEqual(200);
});

test("admin can't login with wrong password", async () => {
  const response = await api
    .post("/v1/api/public/login")
    .send({ username: "testadmin", password: "wrongpassword" });

  expect(response.status).toEqual(401);
});

afterAll(() => {
  mongoose.connection.close();
});
