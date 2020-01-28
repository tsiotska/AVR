import '../schemes/userSchema';
import bcrypt from "bcryptjs";

import {User} from '../schemes/userSchema';

export const findUser = (param, value) => {
  return User.findOne({[param]: value});
};

export const createUser = (result) => {
  const user = new User({
    email: result.value.email,
    username: result.value.username,
    password: result.value.password,
    imageName: "defaultAva.jpg",
    createdAt: new Date()
  });
  return user.save();
};

export const updateUser = (user, type, data) => {
  return User.updateOne({username: user.username}, {}).set({ [type]: data, updatedAt: new Date() });
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



