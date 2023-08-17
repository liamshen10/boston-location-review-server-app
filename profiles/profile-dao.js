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

const followUser = async (userId, userIdToFollow) => {
  return Profile.updateOne(
    { userId: userId },
    { $addToSet: { following: userIdToFollow } }
  );
};

const unfollowUser = async (userId, userIdToUnfollow) => {
  return Profile.updateOne(
    { userId: userId },
    { $pull: { following: userIdToUnfollow } }
  );
};

const favoriteLocation = async (userId, locationId) => {
  return Profile.updateOne(
    { userId: userId },
    { $addToSet: { favorites: locationId } }
  );
};

const unfavoriteLocation = async (userId, locationId) => {
  return Profile.updateOne(
    { userId: userId },
    { $pull: { favorites: locationId } }
  );
};

export { favoriteLocation, unfavoriteLocation };



export { getProfile, updateProfile, createProfile , followUser, unfollowUser};
