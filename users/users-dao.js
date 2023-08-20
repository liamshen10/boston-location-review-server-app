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

const addDeletedReviewToAdmin = async (reviewId, userId) => {
  return await UserModel.findByIdAndUpdate(
    userId,
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

export { deleteReviewFromUser, addDeletedReviewToAdmin, createAdminUser, createUser, findUserByUsername, getProfile, updateProfile, updateUserReviews };