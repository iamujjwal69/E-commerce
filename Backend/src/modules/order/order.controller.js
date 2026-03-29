const Order = require('./order.model');
const OrderItem = require('./order-item.model');
const Cart = require('../cart/cart.model');
const CartItem = require('../cart/cart-item.model');
const Product = require('../product/product.model');
const User = require('../user/user.model');
const { sendOrderConfirmation } = require('../../utils/mailer');

const placeOrder = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { shipping_address, payment_method } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(400).json({ error: 'Cart is empty' });

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [Product]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let total_amount = 0;
    for (const item of cartItems) {
      if (item.Product.stock_quantity < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${item.Product.name}` });
      }
      total_amount += item.quantity * item.Product.price;
    }

    const order = await Order.create({
      user_id,
      shipping_address,
      payment_method,
      total_amount,
      order_status: 'pending'
    });

    for (const item of cartItems) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.Product.price
      });

      item.Product.stock_quantity -= item.quantity;
      await item.Product.save();
    }

    await CartItem.destroy({ where: { cart_id: cart.id } });

    const user = await User.findByPk(user_id);
    const userEmail = user ? user.email : 'guest@example.com';
    sendOrderConfirmation(userEmail, order, cartItems);

    res.status(201).json({
      order: { id: order.id },
      order_id: order.id,
      status: order.order_status,
      total: total_amount,
      confirmation_message: 'Order placed successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const order = await Order.findOne({
      where: { id, user_id },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, attributes: ['name', 'main_image_url', 'price'] }]
      }]
    });

    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const listUserOrders = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const orders = await Order.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']],
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, attributes: ['name', 'main_image_url', 'price'] }]
      }]
    });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { placeOrder, getOrder, listUserOrders };
