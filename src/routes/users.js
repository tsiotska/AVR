import mongoose from "mongoose";

const router = require('express').Router();
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import {
  updateUser,
  findUserByName,
  findUserByToken,
  createUser,
  hashPassword,
  comparePassword
} from "../CRUDs/userCRUD";

import {User} from '../schemes/userSchema';

//validation schemas
const registrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
});


router.post(('/register'), async (req, res, next) => {
  try {
    console.log(req.body)
    const result = Joi.validate(req.body, registrationSchema)
    if (result.error) {
      console.log(result.error)
      res.json(result.error.details.path[0] === "password" ? {message: "Please, enter correct email!"} :
        {message: "Password is correct, but...!"});
      return
    }

//FindUser
    const user = await User.findOne({username: result.value.username});
    if (user) {
      res.json({registered: false, message: 'Email is already in use.'});
      return
    }

    const hash = await hashPassword(result.value.password);
    delete result.value.confirmationPassword;
    result.value.password = hash;

    //createUser
    const newUser = await new User(result.value);
    await newUser.save();

    console.log(newUser);

    res.json({
      registered: true,
      message: 'Registration successfully, go ahead and login.'
    })

  } catch (error) {
    next(error)
  }
});


router.post(('/login'), async (req, res, next) => {

    const result = Joi.validate(req.body, loginSchema);

    if (result.error) {
      res.json({message: "Your username or password is incorrect!"});
      return
    }

    let user = await findUserByName(result.value.username);

    if (user.length !== 0 && await comparePassword(req.body.password, user[0].password)) {

      const token = await jwt.sign({id: user[0]._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      await updateUser(user, token);
      const updatedUser = await findUserByName(result.value.username);

      res.json({
        auth: true,
        token: token,
        message: 'You are accepted!',
        user: {username: updatedUser[0].username, email: updatedUser[0].email}
      });

    } else {
      res.json({auth: false, token: null, message: 'Your username or password is incorrect!'});
    }
  }
);


function isTokenExpired(token) {
  try {
    const expiration = new Date(0);
    const decoded = decode(token);
    expiration.setUTCSeconds(decoded.exp);
    return expiration.valueOf() > new Date().valueOf();
  } catch (err) {
    return false;
  }
}


router.get('/profile', async (req, res) => {
  let token = req.headers.authorization;
  console.log(token);

  const user = await findUserByToken(token);

  console.log("Well... You are...");
  console.log(user);

  console.log(isTokenExpired(token));
  if (!isTokenExpired(token)) {
    console.log("Let go...");
    res.send({
      auth: true,
      token: token,
      user: {username: user[0].username, email: user[0].email}
    })
  } else {
    console.log("Token is expired!");
    res.send({
      auth: false,
      token: null,
      user: {username: null, email: null}
    })
  }
});


router.get('/logout', function (req, res) {
  res.send({auth: false, token: null, user: {username: null, email: null}});
});

module.exports = router;
