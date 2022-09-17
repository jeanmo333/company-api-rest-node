import { ROLES } from "../models/Roles.js";
import User from "../models/User.js";
 
export const verifyUplicateUsernameOEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) return res.status(400).json({ message: "Username already exists" });

  const email = await User.findOne({ email: req.params.email });
  if (email) return res.status(400).json({ message: "email already exists" });

  next();
};

export const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(404).json({
          message: `role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};
