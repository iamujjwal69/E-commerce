const Product = require('./product.model');
const Category = require('./category.model');
const { Op } = require('sequelize');

class ProductRepository {
  async findAll({ categoryId, category, search, page = 1, limit = 40 }) {
    const offset = (page - 1) * limit;
    const where = {};
    const include = [{ model: Category, attributes: ['name'] }];

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Support filtering by category name string (from navbar links) or by ID
    if (category && isNaN(category)) {
      // It's a category name string — filter via include
      include[0].where = { name: { [Op.iLike]: `%${category}%` } };
      include[0].required = true;
    } else if (category || categoryId) {
      where.category_id = category || categoryId;
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return { data: rows, total: count, page, limit };
  }

  async findById(id) {
    return Product.findByPk(id, { include: [Category] });
  }
}

module.exports = new ProductRepository();
