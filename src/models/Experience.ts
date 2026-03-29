import mongoose, { Schema } from 'mongoose';

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  type: String, // Industry, Training, Internship etc.
  status: String, // Running, Completed
  role: String,
  period: String,
  description: String,
  link: String,
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
