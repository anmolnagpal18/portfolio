import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';
import About from '@/models/About';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Certification from '@/models/Certification';
import Skill from '@/models/Skill';

// Get aggregated portfolio data
export async function GET() {
  try {
    await connectDB();
    
    // Fetch all collections in parallel
    const [profile, about, projects, experience, education, certifications, skills] = await Promise.all([
      Profile.findOne({}),
      About.findOne({}),
      Project.find({}).sort({ date: -1 }),
      Experience.find({}),
      Education.find({}),
      Certification.find({}),
      Skill.find({}),
    ]);

    // Return in the original monolithic format to maintain frontend compatibility
    return NextResponse.json({
      profile: profile || {},
      about: about || {},
      projects: projects || [],
      experience: experience || [],
      education: education || [],
      certifications: certifications || [],
      skills: skills || []
    });
  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// Update portfolio data (Admin only)
export async function POST(request: Request) {
  try {
    const { password, data } = await request.json();

    // Simple password check
    if (password !== (process.env.ADMIN_PASSWORD || 'anmol123')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Route updates to individual models if they are provided in the data object
    const updates = [];

    if (data.profile) {
      updates.push(Profile.findOneAndUpdate({}, data.profile, { upsert: true, new: true }));
    }
    if (data.about) {
      updates.push(About.findOneAndUpdate({}, data.about, { upsert: true, new: true }));
    }
    
    // For arrays, we usually replace the whole collection for simplicity in this dashboard
    if (data.projects) {
      updates.push(Project.deleteMany({}).then(() => Project.insertMany(data.projects)));
    }
    if (data.experience) {
      updates.push(Experience.deleteMany({}).then(() => Experience.insertMany(data.experience)));
    }
    if (data.education) {
      updates.push(Education.deleteMany({}).then(() => Education.insertMany(data.education)));
    }
    if (data.certifications) {
      updates.push(Certification.deleteMany({}).then(() => Certification.insertMany(data.certifications)));
    }
    if (data.skills) {
      updates.push(Skill.deleteMany({}).then(() => Skill.insertMany(data.skills)));
    }

    await Promise.all(updates);
    
    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
