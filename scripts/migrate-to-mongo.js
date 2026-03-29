import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load env variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// Define the schema here to avoid importing the model from src
// which might have ESM/CJS compatibility issues when running directly with node
const PortfolioSchema = new mongoose.Schema({
  profile: Object,
  about: Object,
  skills: Array,
  projects: Array,
  experience: Array,
  education: Array,
  certifications: Array,
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
    console.log(`Reading data from ${dataPath}...`);
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(rawData);

    console.log('Migrating portfolio data...');
    // We only need one portfolio document. Upsert it.
    await Portfolio.findOneAndUpdate({}, data, { upsert: true, new: true });
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
