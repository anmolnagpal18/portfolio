const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function updateCvPath() {
  if (!MONGODB_URI) {
    console.error('No MONGODB_URI found');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({
    profile: { cvPath: String, name: String }
  }));

  const data = await Portfolio.findOne({});
  if (data && data.profile) {
    const newPath = '/Anmol_Nagpal_CV.pdf';
    console.log(`Updating cvPath: ${data.profile.cvPath} -> ${newPath}`);
    data.profile.cvPath = newPath;
    await data.save();
    console.log('Updated database successfully');
  }

  await mongoose.disconnect();
}

updateCvPath().catch(err => console.error(err));
