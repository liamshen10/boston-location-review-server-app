import mongoose from 'mongoose';
import ReviewSchema from './reviews-schema.js';

const ReviewModel = mongoose.model('reviews', ReviewSchema);

export default ReviewModel;
