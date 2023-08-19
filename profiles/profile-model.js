import mongoose from 'mongoose';
import ProfileSchema from './profile-schema.js';

const ProfileModel = mongoose.model('profiles', ProfileSchema);

export default ProfileModel;
