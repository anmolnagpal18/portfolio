import mongoose, { Schema } from 'mongoose';

const PortfolioSchema = new Schema({
  profile: {
    name: String,
    title: String,
    bio: String,
    heroImage: String,
    experienceImage: String,
    cvPath: String,
    // Keep internal legacy fields for safety
    role: String,
    photoPath: String,
  },
  skills: { type: Schema.Types.Mixed },
  about: { type: Schema.Types.Mixed },
  projects: { type: Schema.Types.Mixed },
  experience: { type: Schema.Types.Mixed },
  education: { type: Schema.Types.Mixed },
  certifications: { type: Schema.Types.Mixed },
}, { 
  timestamps: true,
  strict: false // Allow fields not explicitly defined
});

// Prevent multiple model compiles in Next.js development
export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
