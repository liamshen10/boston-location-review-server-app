import mongoose from 'mongoose';
import  DeletedReviewsSchema from './deleted-reviews-schema.js';

const DeletedReviewModel = mongoose.model('DeletedReviews', DeletedReviewsSchema);

export default DeletedReviewModel;
