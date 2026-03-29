const ProductRepository = require('./product.repository');

class ProductController {
  async getAll(req, res, next) {
    try {
      const { category, search, page, limit } = req.query;
      const result = await ProductRepository.findAll({
        category,
        search,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 40
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
