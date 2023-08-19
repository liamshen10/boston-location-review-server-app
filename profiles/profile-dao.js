import ProfileModel from './profile-model.js';

async function getProfile(profileId) {
  return await ProfileModel.findById(profileId);
}

async function updateProfile(id, user) {
  return ProfileModel.updateOne({ userId: id }, { $set: user })
}


async function createProfile(profileData) {
  const newProfile = await ProfileModel.create(profileData);
  return newProfile; // Return the newly created profile
}


export { getProfile, updateProfile, createProfile  };
