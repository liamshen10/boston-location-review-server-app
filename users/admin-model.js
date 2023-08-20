import mongoose from 'mongoose';
import AdminSchema from './admin-schema.js';

const AdminModel = mongoose.model('admins', AdminSchema);
export default AdminModel;