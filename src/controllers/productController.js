import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.send(product);
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.send({ message: "Producto eliminado" });
};
