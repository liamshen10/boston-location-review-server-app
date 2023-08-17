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
  const { profileId } = req.params;
  const profileUpdate = req.body;
  const updatedProfile = await profileDao.updateProfile(profileId, profileUpdate);

  if (updatedProfile) {
    res.json(updatedProfile);
  } else {
    res.status(404).send('Profile not found.');
  }
}

const ProfileController = (app) => {
  app.get('/profile/:profileId', getProfile);
  app.put('/profile/:profileId', updateProfile);
  // ... add other profile routes as needed
}

export default ProfileController;
