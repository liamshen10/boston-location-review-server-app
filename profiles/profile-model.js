import mongoose from 'mongoose';
import ProfileSchema from './profile-schema';

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export default ProfileModel;
