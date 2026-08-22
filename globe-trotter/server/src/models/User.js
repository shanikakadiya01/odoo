import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    additionalInfo: { type: String, trim: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: '' },
    preferredCurrency: { type: String, default: 'USD' },
    savedDestinations: [{ type: String, ref: 'City' }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
