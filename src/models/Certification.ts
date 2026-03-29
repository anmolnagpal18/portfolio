import mongoose, { Schema } from 'mongoose';

const CertificationSchema = new Schema({
  title: { type: String, required: true },
  issuer: String,
  date: String,
  link: String,
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
