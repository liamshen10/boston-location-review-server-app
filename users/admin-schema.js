import mongoose from 'mongoose';


const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    reviews_deleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
  }, { collection: "admins" });

 export default AdminSchema;