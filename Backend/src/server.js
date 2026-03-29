const app = require('./app');
const sequelize = require('./config/db');
const Product = require('./modules/product/product.model');
const seed = require('./seed');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    
    // Load associations
    require('./config/associations');
    
    // Sync DB
    await sequelize.sync(); 

    // Auto-seed if database is empty
    const productCount = await Product.count();
    if (productCount === 0) {
      console.log('Database is empty. Seeding initial data...');
      await seed(false); // false means don't force sync, just insert data
      console.log('Auto-seeding complete.');
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
