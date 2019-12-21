import mongoose from 'mongoose';
import '../schemes/userSchema';
import bcrypt from "bcryptjs";

const user = mongoose.model('userSchema');

export const findUser = (username) => {
  return  user.find({username: username})
};

export const createUser = (req) => {
  console.log(req.body);
  const User = new user({
    email: req.body.email,
    surname: req.body.surname,
    password: req.body.password,
    createdAt: new Date()
  });
  return User.save();
};

export const updateUser = (data, token) => {

  return user.update({username: data.username}, {$set: {token: token}});
};

export const hashPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Hashing failed', error)
  }
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash).then((result) => {
    console.log(result);
    return result;
  })
};





