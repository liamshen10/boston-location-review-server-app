import mongoose from 'mongoose';
import  DeletedReviewsSchema from './deleted-reviews-schema.js';

const DeletedReviewModel = mongoose.model('deletedReviews', DeletedReviewsSchema);

export default DeletedReviewModel;
