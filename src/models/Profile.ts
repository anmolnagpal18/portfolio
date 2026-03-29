import mongoose, { Schema } from 'mongoose';

const ProfileSchema = new Schema({
  name: String,
  title: String,
  bio: String,
  heroImage: String, // Base64 data URL
  experienceImage: String, // Base64 data URL
  cvPath: String, // Base64 data URL for PDF
  role: String,
  photoPath: String,
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
