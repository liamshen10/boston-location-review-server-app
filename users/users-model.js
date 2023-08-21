import mongoose from 'mongoose';
import UserSchema from './users-schema.js';

const UserModel = mongoose.model('users', UserSchema);



export default UserModel;