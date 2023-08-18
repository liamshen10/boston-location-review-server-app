import mongoose from 'mongoose';
import ReviewSchema from './reviews-schema.js';

const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;
