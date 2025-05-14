import Ticket from "../models/Ticket.js";
import Product from "../models/Product.js";
import { v4 as uuidv4 } from "uuid";

export const purchaseCart = async (req, res) => {
  // Simulación: req.user.cart contiene [{product, quantity}]
  const cart = req.user.cartProducts; // Debes poblar esto según tu modelo real
  let total = 0;
  let productsPurchased = [];
  let productsNoStock = [];

  for (const item of cart) {
    const product = await Product.findById(item.product);
    if (product && product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
      total += product.price * item.quantity;
      productsPurchased.push({ product: product._id, quantity: item.quantity });
    } else {
      productsNoStock.push(item.product);
    }
  }

  if (productsPurchased.length > 0) {
    const ticket = await Ticket.create({
      code: uuidv4(),
      amount: total,
      purchaser: req.user.email,
      products: productsPurchased,
    });
    return res.send({ ticket, productsNoStock });
  } else {
    return res
      .status(400)
      .send({ message: "No se pudo realizar la compra", productsNoStock });
  }
};
