import ProfileModel from './profile-model.js';

async function getProfile(profileId) {
  return await ProfileModel.findById(profileId).populate('following followers favorites reviews bookmarks');
}

async function updateProfile(profileId, profileUpdate) {
  return await ProfileModel.findByIdAndUpdate(profileId, profileUpdate, { new: true });
}

export { getProfile, updateProfile };
