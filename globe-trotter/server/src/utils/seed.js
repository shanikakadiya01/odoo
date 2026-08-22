import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { City } from '../models/City.js';
import { User } from '../models/User.js';
import { sampleCities } from './seedData.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/globetrotter';
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);

    await City.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing cities and users from the database.');

    const citiesToInsert = sampleCities.map(city => city);
    await City.insertMany(citiesToInsert);
    console.log(`Successfully seeded ${citiesToInsert.length} cities.`);

    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = {
      _id: 'user_demo_01',
      name: 'Alex Explorer',
      email: 'alex@globetrotter.io',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      preferredCurrency: 'USD',
      savedDestinations: ['city_paris_01', 'city_tokyo_02', 'city_bali_05']
    };
    await User.create(demoUser);
    console.log('Successfully seeded demo user.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
