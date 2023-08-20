import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
    default: function() {
      return this.role === 'administrator' ? null : [];
    }
  },
}, { collection: "users" });



export default UserSchema;