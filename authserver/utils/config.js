import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const USERNAME_MINLENGTH = process.env.USERNAME_MINLENGTH || 5;

const KEY_GEN_ALG = process.env.KEY_GEN_ALG || "EdDSA";

const REDIS_URI = process.env.REDIS_URI;

//asymmetric keys ttl in seconds
const KEY_TTL = process.env.KEY_TTL || 2592000;

//Token time to live in minutes
const TOKEN_TTL = process.env.TOKEN_TTL || 15;

export {
  MONGODB_URI,
  PORT,
  USERNAME_MINLENGTH,
  KEY_GEN_ALG,
  REDIS_URI,
  KEY_TTL,
  TOKEN_TTL,
};
