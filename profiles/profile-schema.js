import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }],
  // ... add other fields as needed
}, { collection: "profiles" });

export default ProfileSchema;