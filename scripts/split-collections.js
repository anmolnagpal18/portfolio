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

// Define Schemas for Migration
const ProfileSchema = new mongoose.Schema({
  name: String, title: String, bio: String, heroImage: String, experienceImage: String, cvPath: String, role: String, photoPath: String,
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  quote: String, greeting: String, focus: String, marqueeRoles: [String],
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  image: String, title: String, tagline: String, tags: [String], description: String, liveLink: String, githubLink: String, date: String,
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company: String, type: String, status: String, role: String, period: String, description: String, link: String,
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  school: String, type: String, status: String, degree: String, period: String, details: String,
}, { timestamps: true });

const CertificationSchema = new mongoose.Schema({
  title: String, issuer: String, date: String, link: String,
}, { timestamps: true });

const PortfolioSchema = new mongoose.Schema({}, { strict: false, collection: 'portfolios' });

// Models
const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
const About = mongoose.models.About || mongoose.model('About', AboutSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

async function fileToBase64(filePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const buffer = await fs.readFile(fullPath);
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    if (ext === '.pdf') mimeType = 'application/pdf';
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.warn(`Could not convert file ${filePath} to Base64:`, err.message);
    return filePath; // Keep as is if failed
  }
}

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const portfolioData = await Portfolio.findOne({});
    if (!portfolioData) {
      console.log('No existing portfolio data found to migrate.');
      process.exit(0);
    }

    const d = portfolioData.toObject();

    // 1. Profile
    if (d.profile) {
      console.log('Migrating Profile...');
      const profile = { ...d.profile };
      if (profile.heroImage && !profile.heroImage.startsWith('data:')) profile.heroImage = await fileToBase64(profile.heroImage);
      if (profile.experienceImage && !profile.experienceImage.startsWith('data:')) profile.experienceImage = await fileToBase64(profile.experienceImage);
      if (profile.cvPath && !profile.cvPath.startsWith('data:')) profile.cvPath = await fileToBase64(profile.cvPath);
      await Profile.findOneAndUpdate({}, profile, { upsert: true });
    }

    // 2. About
    if (d.about) {
      console.log('Migrating About...');
      await About.findOneAndUpdate({}, d.about, { upsert: true });
    }

    // 3. Projects
    if (d.projects && Array.isArray(d.projects)) {
      console.log('Migrating Projects...');
      await Project.deleteMany({});
      for (const p of d.projects) {
        const project = { ...p };
        if (project.image && !project.image.startsWith('data:')) project.image = await fileToBase64(project.image);
        await Project.create(project);
      }
    }

    // 4. Experience
    if (d.experience && Array.isArray(d.experience)) {
      console.log('Migrating Experience...');
      await Experience.deleteMany({});
      await Experience.insertMany(d.experience);
    }

    // 5. Education
    if (d.education && Array.isArray(d.education)) {
      console.log('Migrating Education...');
      await Education.deleteMany({});
      await Education.insertMany(d.education);
    }

    // 6. Certifications
    if (d.certifications && Array.isArray(d.certifications)) {
      console.log('Migrating Certifications...');
      await Certification.deleteMany({});
      await Certification.insertMany(d.certifications);
    }

    console.log('Migration to separate collections completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
