import mongoose from 'mongoose';
import UserSchema from '../schema/UserSchema';

const User = mongoose.model('User', UserSchema);

export default User;