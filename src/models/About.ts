import mongoose, { Schema } from 'mongoose';

const AboutSchema = new Schema({
  quote: String,
  greeting: String,
  focus: String,
  marqueeRoles: [String],
}, { timestamps: true });

export default mongoose.models.About || mongoose.model('About', AboutSchema) ;
