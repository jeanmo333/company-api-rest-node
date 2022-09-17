import product from "../models/products.js";

//function para crear un producto
export const createProduct = async (req, res, next) => {
  //extraemos lo que esta mandado el cliente
  const { name, category, price, imgUrl } = req.body;
  //guardamos en un variable el objeto que viene del cliente
  const newProduct = new product({ name, category, price, imgUrl });
  //lo guardamos en la base de datos
  const productSaved = await newProduct.save();
  //lo devolvemos al cliente el producto guardado en la base de datos
  res.status(200).json({ message: "creating succesfuly" });
};

//function para obtener todo los productos
export const getProducts = async (req, res, next) => {
  //buscar todo los productos en la base de datos
  const products = await product.find();
  //devolvemos al cliente todo los productos
  res.json(products);
};

//buscar un producto por id
export const getProductById = async (req, res, next) => {
  //buscamos el producto en la base de dato
  const productId = await product.findById(req.params.productId);
  //buscamos el producto en la base de dato al cliente
  res.status(200).json(productId);
};

//function para actualizar un producto
export const updateProductById = async (req, res, next) => {
  //revisar si el producto existe por su id
  const productId = await product.findById(req.params.productId);
  if (!productId)
    return res.status(400).json({
      message: `not found the product with id: ${req.params.productId}`,
    });

  await product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Product updated successfully" });
};

//function para eliminar un producto
export const deleteProductById = async (req, res, next) => {
  //revisar si el producto existe por su id
  const productId = await product.findById(req.params.productId);
  if (!productId)
    return res.status(400).json({
      message: `not found the product with id: ${req.params.productId}`,
    });

  await product.findByIdAndDelete(req.params.productId);
  res.status(200).json({ message: "deleted succesfuly" });
};
