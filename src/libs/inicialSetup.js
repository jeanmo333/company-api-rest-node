
import Roles from "../models/Roles.js";

export const createRole = async () => {
  const count = await Roles.estimatedDocumentCount();
  try {
    if (count > 0) return;

    const values = await Promise.all([
      new Roles({ name: "user" }).save(),
      new Roles({ name: "moderador" }).save(),
      new Roles({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
