const User = require('../modules/user/user.model');
const Product = require('../modules/product/product.model');
const Category = require('../modules/product/category.model');
const Cart = require('../modules/cart/cart.model');
const CartItem = require('../modules/cart/cart-item.model');
const Order = require('../modules/order/order.model');
const OrderItem = require('../modules/order/order-item.model');
const Wishlist = require('../modules/wishlist/wishlist.model');

// Product & Category
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Category nested (self-referential)
Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });

// Cart & User
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Cart & CartItem
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// CartItem & Product
CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

// Order & User
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order & OrderItem
Order.hasMany(OrderItem, { as: 'items', foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });

// OrderItem & Product
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Wishlist
User.hasMany(Wishlist, { foreignKey: 'user_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(Wishlist, { foreignKey: 'product_id' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Wishlist
};
