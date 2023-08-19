import UserModel from './users-model.js';

async function createUser(user) {
  return await UserModel.create(user);
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


export { createUser, findUserByUsername, getProfile, updateProfile, updateUserReviews };