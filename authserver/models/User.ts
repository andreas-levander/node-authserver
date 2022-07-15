import mongoose from "mongoose";

interface MongoUser {
  username: string;
  passwordHash: string;
  roles: string[];
}

const userSchema = new mongoose.Schema<MongoUser>({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
