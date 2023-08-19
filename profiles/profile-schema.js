import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { collection: "profiles" });

export default ProfileSchema;