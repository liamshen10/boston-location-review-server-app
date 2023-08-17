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


const ProfileController = (app) => {
  app.get('/profile/:profileId', getProfile);
  app.put('/profile', updateProfile);
  // ... add other profile routes as needed
}

export default ProfileController;
