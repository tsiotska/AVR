import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  token: String,
  imageName: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});


export const User = mongoose.model('user', userSchema);
