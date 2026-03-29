import mongoose, { Schema } from 'mongoose';

const EducationSchema = new Schema({
  school: { type: String, required: true },
  type: String, // Academic, Professional etc.
  status: String, // Running, Completed
  degree: String,
  period: String,
  details: String, // CGPA/Percentage
}, { timestamps: true });

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
