import User from "../models/User.js";
import bcrypt from "bcrypt";
import passwordGenerator from "generate-password";
import * as logger from "../utils/logger.js";

const createUser = async (username, roles) => {
  const password = passwordGenerator.generate({
    length: 10,
    numbers: true,
  });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    roles,
    passwordHash,
  });
  const newuser = await user.save();

  logger.info(`created new user: ${username}, roles: ${roles}`);

  newuser.password = password;

  return newuser;
};

export { createUser };
