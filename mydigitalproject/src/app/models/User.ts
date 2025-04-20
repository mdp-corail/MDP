import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  isAdmin: boolean;
}

const UserSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", UserSchema);
