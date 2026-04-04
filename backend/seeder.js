const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  { name: 'iPhone 15 Pro', brand: 'Apple', price: 134900, category: 'Mobiles', description: 'The iPhone 15 Pro features a titanium design, A17 Pro chip, and a 48MP camera system.', stock: 20, rating: 4.8, numReviews: 1240, featured: true, discount: 5, images: ['https://images.unsplash.com/photo-1668363958849-b22a6d5c47d7?w=600&q=80'] },
  { name: 'MacBook Pro 16"', brand: 'Apple', price: 249900, category: 'Laptops', description: 'MacBook Pro with M3 Max chip delivers unprecedented performance for professionals.', stock: 10, rating: 4.9, numReviews: 890, featured: true, discount: 0, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'] },
  { name: 'Sony WH-1000XM5', brand: 'Sony', price: 29990, category: 'Audio', description: 'Industry-leading noise cancellation with 30-hour battery and exceptional sound quality.', stock: 50, rating: 4.7, numReviews: 2100, featured: true, discount: 15, images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'] },
  { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 129999, category: 'Mobiles', description: 'Galaxy AI comes to the S24 Ultra with a 200MP camera and built-in S Pen.', stock: 15, rating: 4.6, numReviews: 760, featured: true, discount: 10, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'] },
  { name: 'Dell XPS 15', brand: 'Dell', price: 159900, category: 'Laptops', description: 'Dell XPS 15 with Intel Core i9, 32GB RAM, and OLED display for creators.', stock: 8, rating: 4.5, numReviews: 430, featured: false, discount: 8, images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80'] },
  { name: 'AirPods Pro 2nd Gen', brand: 'Apple', price: 24900, category: 'Audio', description: 'AirPods Pro with H2 chip, active noise cancellation, and Transparency mode.', stock: 100, rating: 4.8, numReviews: 3200, featured: false, discount: 0, images: ['https://images.unsplash.com/photo-1675525587760-81b7e26ede33?w=600&q=80'] },
  { name: 'iPad Pro 12.9"', brand: 'Apple', price: 112900, category: 'Tablets', description: 'iPad Pro powered by M2 chip with Liquid Retina XDR display and Apple Pencil support.', stock: 25, rating: 4.7, numReviews: 540, featured: false, discount: 5, images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80'] },
  { name: 'Sony A7 IV Camera', brand: 'Sony', price: 199990, category: 'Cameras', description: 'Full-frame mirrorless camera with 33MP BSI CMOS sensor and 4K 120p video.', stock: 5, rating: 4.9, numReviews: 310, featured: false, discount: 0, images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80'] },
  { name: 'OnePlus 12R', brand: 'OnePlus', price: 39999, category: 'Mobiles', description: 'OnePlus 12R with Snapdragon 8 Gen 2, 100W charging, and 50MP camera.', stock: 30, rating: 4.4, numReviews: 980, featured: false, discount: 12, images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'] },
  { name: 'Asus ROG Strix G16', brand: 'Asus', price: 169990, category: 'Laptops', description: 'Gaming laptop with Intel Core i9, RTX 4080, 240Hz display, and ROG cooling.', stock: 12, rating: 4.6, numReviews: 215, featured: false, discount: 5, images: ['https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=600&q=80'] },
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@electrostore.com',
  password: 'admin123',
  role: 'admin',
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany({ role: 'admin' });

    // Seed admin
    await User.create(adminUser);
    console.log('Admin user created: admin@electrostore.com / admin123');

    // Seed products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
