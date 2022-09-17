import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Roles.js";

//function para registrar un usuario
export const signUp = async (req, res) => {
  //evitar nombre usuario duplicado
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "Username already exists" });

  //evitar email usuario duplicado
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "email already exists" });

  //crear un nuevo objeto usuario
  const newUser = new User(req.body);
  const { roles } = req.body;

  //revisar el role del usuario
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  //guardar un nuevo usuario en la base de dato
  await newUser.save();

  res.status(200).json({ message: "user saved successfully" });
};

//function para hacer login de un usuario
export const signIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "email not found" });

  const macthPassword = await userFound.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!macthPassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.JWT_SECRET, {
    expiresIn: 86400, //24horas
  });

  res.json({ token });

};
