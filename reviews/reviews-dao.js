import ReviewModel from './reviews-model.js';

const getReviewsByLocation = async (location_id) => {
  return await ReviewModel.find({ location_id });
};


const createReview = async (reviewData) => {
  const review = new ReviewModel(reviewData);
  return await review.save();
};


const getReview = async (_id) => {
  return await ReviewModel.findById(_id);
};

const deleteReview = async (reviewId) => {
  return await ReviewModel.findByIdAndDelete(reviewId);
};

export {
  getReviewsByLocation,
  createReview,
  getReview,
  deleteReview
};
