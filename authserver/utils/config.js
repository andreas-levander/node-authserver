import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const USERNAME_MINLENGTH = process.env.USERNAME_MINLENGTH || 5;

export { MONGODB_URI, PORT, USERNAME_MINLENGTH };
