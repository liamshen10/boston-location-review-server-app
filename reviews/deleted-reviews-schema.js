import mongoose from 'mongoose';

const DeletedReviewsSchema = new mongoose.Schema({
  deletedreview_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },
  content: { type: String, required: true },
  stars: { type: Number, required: true },
  location_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: 'deletedReviews' });

export default DeletedReviewsSchema;
