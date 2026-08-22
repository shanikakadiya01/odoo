import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['Sightseeing', 'Food & Dining', 'Adventure', 'Culture', 'Transport', 'Other'],
    default: 'Sightseeing'
  },
  cost: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  scheduledDate: { type: Date },
  startTime: { type: String },
  endTime: { type: String }
});

const stopSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  orderIndex: { type: Number, required: true },
  estimatedAccommodationCost: { type: Number, default: 0 },
  activities: [activitySchema]
});

const tripSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalBudget: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    shareSlug: { type: String, unique: true, sparse: true },
    stops: [stopSchema]
  },
  { timestamps: true }
);

export const Trip = mongoose.model('Trip', tripSchema);
