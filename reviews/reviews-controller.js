import * as reviewDao from './reviews-dao.js';
import * as userDao from '../users/users-dao.js';

const getReviewsByLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    const reviews = await reviewDao.getReviewsByLocation(location_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews:', error);
  }
};

const getReviewById = async (req, res) => {
  console.log("Req.params: ", req.params);
  const { _id } = req.params;
  console.log("Review ID:", _id);
  try {
    const review = await reviewDao.getReview(_id);
    console.log("Review: ", review);
    if (review) {

      res.json(review);
    } else {
      res.status(404).send('Review not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching review:', error);
  }
};

const createReview = async (req, res) => {
    try {
      const reviewData = req.body;
      const userId = req.body.userId;
      const newReview = await reviewDao.createReview(reviewData);
      if (newReview) {
        await userDao.updateUserReviews(userId, newReview._id);
        return res.status(201).json(newReview);
      } else {
        return res.status(500).send('Failed to create review');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  };
  

  const deleteReview = async (req, res) => {
    console.log("Params: ", req.params);
    const { _id } = req.params;
    const { adminId } = req.body;
    console.log("Body: ", req.body);
    try {
      const review = await reviewDao.getReview(_id);
      console.log(review);
      if (!review) {
        return res.status(404).send('Review not found.');
      }
  
      // Create a new document in the DeletedReviewModel
      const deletedReview = {
        deletedreview_id: review._id,
        userId: review.userId,
        content: review.content,
        stars: review.stars,
        location_id: review.location_id,
        timestamp: review.timestamp
      };
      
      const newDeletedReview = await reviewDao.createDeletedReview(deletedReview);
      console.log("Deleted Review: ", newDeletedReview._id);

      console.log("Review ID: ", review._id);
      await userDao.deleteReviewFromUser(review.userId, review._id);
      await userDao.addDeletedReviewToAdmin(newDeletedReview._id, adminId._id);
      

      // Delete the review from the ReviewModel
      await reviewDao.deleteReview(_id);

      res.status(200).json({ _id: _id, deletedReview: newDeletedReview });
    } catch (error) {
      res.status(500);
    }
  };
  
const ReviewsController = (app) => {
  app.get('/reviews/:location_id', getReviewsByLocation);
  app.get('/review/:_id', getReviewById);
  app.post('/reviews', createReview);
  app.delete('/review/:_id', deleteReview);

};

export default ReviewsController;
