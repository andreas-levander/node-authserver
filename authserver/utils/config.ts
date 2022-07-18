import dotenv from "dotenv";
import { parseArgNumber, parseURIString } from "./type_helper.js";

dotenv.config();

const PORT = parseArgNumber(process.env.PORT) || 4000;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? parseURIString(process.env.TEST_MONGODB_URI, "MongoDB Test URI")
    : parseURIString(process.env.MONGODB_URI, "MongoDB URI");

const USERNAME_MINLENGTH = parseArgNumber(process.env.USERNAME_MINLENGTH) || 5;

const KEY_GEN_ALG = process.env.KEY_GEN_ALG || "EdDSA";

const REDIS_URI = parseURIString(process.env.REDIS_URI, "Redis URI");

//asymmetric keys ttl in seconds
const KEY_TTL = parseArgNumber(process.env.KEY_TTL) || 2592000;

//Token time to live in minutes
const TOKEN_TTL = parseArgNumber(process.env.TOKEN_TTL) || 15;

export {
  MONGODB_URI,
  PORT,
  USERNAME_MINLENGTH,
  KEY_GEN_ALG,
  REDIS_URI,
  KEY_TTL,
  TOKEN_TTL,
};
