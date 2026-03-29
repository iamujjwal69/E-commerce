const Wishlist = require('./wishlist.model');
const Product = require('../product/product.model');

const getWishlist = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const items = await Wishlist.findAll({
      where: { user_id },
      include: [{ model: Product, attributes: ['id', 'name', 'price', 'main_image_url', 'rating', 'review_count', 'is_prime', 'original_price', 'stock_quantity'] }],
      order: [['created_at', 'DESC']]
    });

    const formattedItems = items.map(item => ({
      wishlist_id: item.id,
      ...item.Product.toJSON()
    }));

    res.json({ wishlist: formattedItems });
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;

    const [item, created] = await Wishlist.findOrCreate({
      where: { user_id, product_id },
      defaults: { user_id, product_id }
    });

    res.status(201).json({ message: created ? 'Added to wishlist' : 'Already in wishlist', item });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { productId } = req.params;

    await Wishlist.destroy({ where: { user_id, product_id: productId } });
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWishlist, addItem, removeItem };
