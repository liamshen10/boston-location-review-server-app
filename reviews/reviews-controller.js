import * as reviewDao from './reviews-dao.js';

const getReviewsByLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    const reviews = await reviewDao.getReviewsByLocation(location_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews:', error);
  }
};

const createReview = async (req, res) => {
    try {
      const reviewData = req.body;
      const newReview = await reviewDao.createReview(reviewData);
      if (newReview) {
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
  const { reviewId } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  try {
    const review = await reviewDao.getReview(reviewId);

    if (!review) {
      return res.status(404).send('Review not found.');
    }

    if (userRole === 'administrator' || (userRole === 'reviewer' && review.user_id === userId)) {
      await reviewDao.deleteReview(reviewId);
      res.status(204).send();
    } else {
      res.status(403).send('You do not have permission to delete this review.');
    }
  } catch (error) {
    res.status(500).send('Error deleting review:', error);
  }
};

const ReviewsController = (app) => {
  app.get('/reviews/:location_id', getReviewsByLocation);
  app.post('/reviews', createReview);
  app.delete('/reviews/:reviewId', deleteReview);
};

export default ReviewsController;
