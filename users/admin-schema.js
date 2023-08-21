import mongoose from 'mongoose';


const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    reviews_deleted: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'deletedReviews' }], default: [] }
}, { collection: "admins" });

export default AdminSchema;
