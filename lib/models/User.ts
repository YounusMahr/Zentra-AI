import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Use existing model if initialized to prevent NestJS/NextJS hot-reloading errors
const User = models.User || model('User', UserSchema);

export default User;
