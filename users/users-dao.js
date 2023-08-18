import UserModel from './users-model.js';

async function createUser(user) {
  return await UserModel.create(user);
}

async function findUserByUsername(username) {
  return await UserModel.findOne({ username });
}

export { createUser, findUserByUsername };