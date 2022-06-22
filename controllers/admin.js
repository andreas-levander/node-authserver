import User from "../models/User";
import bcrypt from "bcrypt";
import passwordGenerator from "generate-password";

const createUser = async (username, roles) => {
  console.log(username, roles);

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

  return await user.save();
};

export { createUser };
