import pkg from "mongoose";
const { Schema, model } = pkg;

export const ROLES = ["user", "admin", "moderador"];
const roleSchema = new Schema(
  {
    name: ["user", "admin", "moderador"],
  },
  {
    versionKey: false,
  }
);

export default model("roles", roleSchema);
