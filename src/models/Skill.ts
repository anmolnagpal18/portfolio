import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  category: { type: String, required: true },
  items: [String],
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
