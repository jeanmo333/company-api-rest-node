import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import ProductsRoutes from "./routes/ProductsRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import { createRole } from "./libs/inicialSetup.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
dotenv.config();
createRole();

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
      author: 'moril',
      description: 'api con node.js',
      version: '1.0'
  });
});


app.use('/api/products',ProductsRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/users', userRoutes);
export default app;
