import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  image: String, // Base64 image
  title: String,
  tagline: String,
  tags: [String],
  description: String,
  liveLink: String,
  githubLink: String,
  date: String,
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
