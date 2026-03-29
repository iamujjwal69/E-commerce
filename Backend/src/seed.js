const sequelize = require('./config/db');
require('./config/associations');
const Category = require('./modules/product/category.model');
const Product = require('./modules/product/product.model');

async function seed(force = true) {
  if (force) {
    await sequelize.sync({ force: true });
    console.log('Database cleared');
  } else {
    // If not forcing, just sync without dropping tables
    await sequelize.sync();
  }

  const electronics = await Category.create({ name: 'Electronics' });
  const clothing = await Category.create({ name: 'Clothing & Fashion' });
  const books = await Category.create({ name: 'Books' });
  const home = await Category.create({ name: 'Home & Kitchen' });

  await Product.bulkCreate([
    // Electronics
    {
      name: 'Apple MacBook Air M2',
      description: 'Supercharged by the next-generation M2 chip. Up to 18 hours battery. 13.6-inch Liquid Retina display. 8GB RAM, 256GB SSD.',
      price: 114900, original_price: 119900, stock_quantity: 15,
      category_id: electronics.id, rating: 4.7, review_count: 12483, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      image_urls: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000'
      ]
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: '200MP Camera, titanium frame, S Pen, 5000mAh battery. The ultimate Galaxy experience with AI.',
      price: 129999, original_price: 134999, stock_quantity: 42,
      category_id: electronics.id, rating: 4.5, review_count: 8721, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Sony WH-1000XM5 Headphones',
      description: 'Industry-leading noise cancellation. 30-hr battery life. Auto NC Optimizer. Crystal clear hands-free calls.',
      price: 26990, original_price: 34990, stock_quantity: 60,
      category_id: electronics.id, rating: 4.6, review_count: 21045, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
      image_urls: [
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1000'
      ]
    },
    {
      name: 'Apple iPad Pro 12.9" M2',
      description: 'The most powerful iPad ever. M2 chip, Liquid Retina XDR display, Wi-Fi 6E, Thunderbolt 4.',
      price: 112900, original_price: 122900, stock_quantity: 22,
      category_id: electronics.id, rating: 4.8, review_count: 5302, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Logitech MX Master 3S Wireless Mouse',
      description: 'Ergo precision mouse with ultrafast scrolling, near-silent clicks, and 8K DPI sensor. Perfect for productivity.',
      price: 9995, original_price: 11995, stock_quantity: 80,
      category_id: electronics.id, rating: 4.5, review_count: 3892, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000'
    },
    // Clothing
    {
      name: "Levi's 511 Slim Fit Jeans",
      description: "Classic slim fit with a little stretch for all-day comfort. Made from sustainable cotton. Available in multiple washes.",
      price: 2999, original_price: 4499, stock_quantity: 120,
      category_id: clothing.id, rating: 4.3, review_count: 9834, is_prime: false,
      main_image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Nike Air Max 270',
      description: 'React foam midsole with Max Air unit for all-day comfort. Engineered mesh upper for lightweight breathability.',
      price: 10995, original_price: 13995, stock_quantity: 45,
      category_id: clothing.id, rating: 4.4, review_count: 6712, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Polo Ralph Lauren Classic Fit Shirt',
      description: 'Iconic polo shirt crafted from soft combed cotton. The classic fit, signature pony embroidery.',
      price: 4999, original_price: 6500, stock_quantity: 90,
      category_id: clothing.id, rating: 4.2, review_count: 4120, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000'
    },
    // Books
    {
      name: 'The Pragmatic Programmer',
      description: 'Your Journey to Mastery. 20th Anniversary Edition. Essential reading for every developer — timeless advice for software craftsmanship.',
      price: 2499, original_price: 3499, stock_quantity: 200,
      category_id: books.id, rating: 4.8, review_count: 14322, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Atomic Habits',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear. #1 NYT Bestseller. Over 15 million copies sold.',
      price: 399, original_price: 599, stock_quantity: 500,
      category_id: books.id, rating: 4.7, review_count: 89234, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000'
    },
    // Home & Kitchen
    {
      name: 'Philips Air Fryer HD9252',
      description: 'Rapid Air Technology for crispy results without oil. 1.2kg capacity. Up to 90% less fat. With 7 preset cooking programs.',
      price: 8995, original_price: 12995, stock_quantity: 35,
      category_id: home.id, rating: 4.4, review_count: 7821, is_prime: true,
      main_image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=1000'
    },
    {
      name: 'Prestige Iris 750W Mixer Grinder',
      description: '3 stainless steel jars, 4-speed control with incher, motor overload protection. Ideal for Indian cooking.',
      price: 3299, original_price: 4999, stock_quantity: 55,
      category_id: home.id, rating: 4.2, review_count: 12543, is_prime: false,
      main_image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000'
    },
  ]);

  console.log('✅ Seeded 12 products');
}

module.exports = seed;

if (require.main === module) {
  seed().catch(e => { 
    console.error(e); 
    process.exit(1); 
  }).then(() => {
    process.exit(0);
  });
}
