const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanup() {
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
  if (data && data.profile && data.profile.cvPath) {
    const oldPath = data.profile.cvPath;
    
    // Check if it has a timestamp
    if (oldPath.includes('/uploads/') && /^\/uploads\/\d+-/.test(oldPath)) {
      const newPath = oldPath.replace(/^\/uploads\/\d+-/, '/uploads/');
      console.log(`Cleaning path: ${oldPath} -> ${newPath}`);

      // Rename on disk
      const oldDiskPath = path.join(process.cwd(), 'public', oldPath);
      const newDiskPath = path.join(process.cwd(), 'public', newPath);

      if (fs.existsSync(oldDiskPath)) {
        fs.renameSync(oldDiskPath, newDiskPath);
        console.log('Renamed file on disk');
      }

      // Update DB
      data.profile.cvPath = newPath;
      await data.save();
      console.log('Updated database');
    } else {
      console.log('Path already clean or not in expected format:', oldPath);
    }
  }

  await mongoose.disconnect();
  console.log('Done');
}

cleanup().catch(err => console.error(err));
