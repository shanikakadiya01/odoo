import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, index: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    costIndex: { type: String, enum: ['$', '$$', '$$$', '$$$$'], default: '$$' },
    averageDailyBudget: { type: Number, default: 100 },
    popularityScore: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    description: { type: String },
    climate: { type: String },
    currency: { type: String },
    highlights: [{ type: String }],
    topActivities: [
      {
        id: String,
        title: String,
        category: String,
        estimatedCost: Number,
        durationHours: Number
      }
    ]
  },
  { timestamps: true }
);

export const City = mongoose.model('City', citySchema);
