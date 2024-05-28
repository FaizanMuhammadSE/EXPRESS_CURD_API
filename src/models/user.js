import mongoose from 'mongoose';
import userSchema from '../schema/user.js';

const User = mongoose.model('user', userSchema);
export { User };
