import UserModel from './users-model.js';

async function createUser(user) {
  return await UserModel.create(user);
}

async function findUserByUsername(username) {
  return await UserModel.findOne({ username });
}

const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Import User model
import User from './users-model.js';

// Function to retrieve a user by their ID
export const findUserById = async (userId) => {
  return await User.findById(userId);
};

// Function to update a user's email and username by their ID
export const updateUserById = async (userId, userUpdateData) => {
  return await User.findByIdAndUpdate(userId, userUpdateData, { new: true });
};



export { createUser, findUserByUsername, updateUser };