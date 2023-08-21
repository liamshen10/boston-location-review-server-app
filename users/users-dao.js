import UserModel from './users-model.js';
import AdminModel from './admin-model.js';

async function createUser(user) {
  return await UserModel.create(user);
}

async function createAdminUser(adminUser) {
  return await AdminModel.create(adminUser);
}

async function findUserByUsername(username) {
  return await UserModel.findOne({ username });
}

async function getProfile(profileId) {
  return await UserModel.findById(profileId);
}

async function updateProfile(id, user) {
  return UserModel.updateOne({ _id: id }, { $set: user })
}

async function updateUserReviews(userId, reviewId) {
  return UserModel.findByIdAndUpdate(
    userId,
    { $push: { reviews: reviewId } },
    { new: true }
  );
}

const addDeletedReviewToAdmin = async (reviewId, adminId) => {
  return await AdminModel.findOneAndUpdate(
    { userId: adminId },
    { $push: { reviews_deleted: reviewId } },
    { new: true }
  );
};


const deleteReviewFromUser = async (userId, reviewId) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    { $pull: { reviews: reviewId } },
    { new: true }
  );
};

const getReviewsForUser = async (userId) => {
  const user = await UserModel.findById(userId).populate('reviews');
  return user.reviews;
};

const getReviewsForAdmin = async (userId) => {
  const user = await AdminModel.findOne({ userId: userId }).populate('reviews_deleted');
  console.log("Admin User: ", user);
  return user.reviews_deleted;
};





export { getReviewsForAdmin, getReviewsForUser, deleteReviewFromUser, addDeletedReviewToAdmin, createAdminUser, createUser, findUserByUsername, getProfile, updateProfile, updateUserReviews };