import ProfileModel from './profile-model.js';

async function getProfile(profileId) {
  return await ProfileModel.findById(profileId).populate('following followers favorites reviews bookmarks');
}

async function updateProfile(profileId, profileUpdate) {
  return await ProfileModel.findByIdAndUpdate(profileId, profileUpdate, { new: true });
}


async function createProfile(profileData) {
  const newProfile = await ProfileModel.create(profileData);
  return newProfile; // Return the newly created profile
}


export { getProfile, updateProfile, createProfile  };
