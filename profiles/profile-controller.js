import * as profileDao from './profile-dao.js';

const getProfile = async (req, res) => {
  const { profileId } = req.params;
  const profile = await profileDao.getProfile(profileId);

  if (profile) {
    // Hide sensitive information for other users
    if (req.user && req.user._id !== profile.userId) {
      profile.email = undefined;
      profile.phone = undefined;
    }

    res.json(profile);
  } else {
    res.status(404).send('Profile not found.');
  }
}

const updateProfile = async (req, res) => {
  const userId = req.user._id; // Assuming the JWT middleware sets the authenticated user data in req.user
  const profileUpdate = req.body;

  // Find the profile associated with the authenticated user
  const profile = await profileDao.getProfileByUserId(userId);

  // Check if the profile exists
  if (!profile) {
    return res.status(404).send('Profile not found.');
  }

  // Update the profile
  const updatedProfile = await profileDao.updateProfile(profile._id, profileUpdate);

  if (updatedProfile) {
    res.json(updatedProfile);
  } else {
    res.status(500).send('Error updating profile.');
  }
}

const followUser = async (req, res) => {
  const { userIdToFollow } = req.params;
  const userId = req.user._id;
  const result = await profileDao.followUser(userId, userIdToFollow);

  if (result) {
    res.json(result);
  } else {
    res.status(500).send('Error following user.');
  }
};

const unfollowUser = async (req, res) => {
  const { userIdToUnfollow } = req.params;
  const userId = req.user._id;
  const result = await profileDao.unfollowUser(userId, userIdToUnfollow);

  if (result) {
    res.json(result);
  } else {
    res.status(500).send('Error unfollowing user.');
  }
};

const favoriteLocation = async (req, res) => {
  const { locationId } = req.params;
  const userId = req.user._id;
  const result = await profileDao.favoriteLocation(userId, locationId);

  if (result) {
    res.json(result);
  } else {
    res.status(500).send('Error favoriting location.');
  }
};

const unfavoriteLocation = async (req, res) => {
  const { locationId } = req.params;
  const userId = req.user._id;
  const result = await profileDao.unfavoriteLocation(userId, locationId);

  if (result) {
    res.json(result);
  } else {
    res.status(500).send('Error unfavoriting location.');
  }
};

const getLoggedInUserProfile = async (req, res) => {
  const userId = req.user._id;
  const profile = await profileDao.findProfileByUserId(userId);

  if (profile) {
    // Include sensitive information for the logged-in user
    res.json(profile);
  } else {
    res.status(404).send('Profile not found.');
  }
};

const getOtherUserProfile = async (req, res) => {
  const { profileId } = req.params;
  const profile = await profileDao.findProfileByUserId(profileId);

  if (profile) {
    // Exclude sensitive information for other users
    const { email, phone, ...publicProfile } = profile;
    res.json(publicProfile);
  } else {
    res.status(404).send('Profile not found.');
  }
};



const ProfileController = (app) => {
  app.get('/profile/:profileId', getProfile);
  app.put('/profile', updateProfile);
  app.put('/profile/follow/:userIdToFollow', followUser);
  app.put('/profile/unfollow/:userIdToUnfollow', unfollowUser);
  app.put('/profile/favorite/:locationId', favoriteLocation);
  app.put('/profile/unfavorite/:locationId', unfavoriteLocation);
  app.get('/profile', getLoggedInUserProfile);
  app.get('/profile/:profileId', getOtherUserProfile);

  // ... add other profile routes as needed
}

export default ProfileController;
