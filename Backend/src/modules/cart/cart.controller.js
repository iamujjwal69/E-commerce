const Cart = require('./cart.model');
const CartItem = require('./cart-item.model');
const Product = require('../product/product.model');
const User = require('../user/user.model');

// Module-level helper — avoids 'this' binding issues in Express middleware
const verifyUser = async (user_id, res) => {
  const user = await User.findByPk(user_id);
  if (!user) {
    res.status(401).json({ error: 'User not found. Please refresh the page.' });
    return false;
  }
  return true;
};

const getCart = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    if (!(await verifyUser(user_id, res))) return;

    let cart = await Cart.findOne({ where: { user_id } });
    if (!cart) {
      cart = await Cart.create({ user_id });
    }

    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product, attributes: ['name', 'price', 'main_image_url'] }]
    });

    const formattedItems = items.map(item => ({
      id: item.id,
      product_id: item.product_id,
      name: item.Product.name,
      price: item.Product.price,
      main_image_url: item.Product.main_image_url,
      quantity: item.quantity,
      subtotal: parseFloat((item.quantity * item.Product.price).toFixed(2))
    }));

    const total = formattedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
    res.json({ cart: { id: cart.id, items: formattedItems, total } });
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    if (!(await verifyUser(user_id, res))) return;

    const { product_id, quantity } = req.body;

    let cart = await Cart.findOne({ where: { user_id } });
    if (!cart) {
      cart = await Cart.create({ user_id });
    }

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id }
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      await cartItem.save();
    } else {
      await CartItem.create({ cart_id: cart.id, product_id, quantity });
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findByPk(itemId);
    if (!cartItem) return res.status(404).json({ error: 'Item not found' });

    cartItem.quantity = parseInt(quantity);
    await cartItem.save();

    res.json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await CartItem.destroy({ where: { id: itemId } });
    res.json({ message: 'Item removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addItem, updateItem, removeItem };
