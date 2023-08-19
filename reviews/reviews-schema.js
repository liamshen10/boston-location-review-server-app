import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  review_id: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  content: { type: String, required: true },
  stars: { type: Number, required: true },
  location_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: 'reviews' });

export default ReviewSchema;
