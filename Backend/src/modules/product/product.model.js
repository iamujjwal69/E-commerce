const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  original_price: { type: DataTypes.DECIMAL(10, 2) },
  stock_quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  category_id: { type: DataTypes.INTEGER },
  main_image_url: { type: DataTypes.TEXT },
  image_urls: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('image_urls');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('image_urls', JSON.stringify(val));
    }
  },
  rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 4.0 },
  review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_prime: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Product;

