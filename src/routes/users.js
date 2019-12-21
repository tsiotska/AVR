import mongoose from "mongoose";

const router = require('express').Router();
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import {updateUser, findUser, createUser, hashPassword, comparePassword} from "../CRUDs/userCRUD";

const User = mongoose.model('userSchema');


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

    const user = await User.findOne({email: result.value.email});
    console.log("Already in use!")
    console.log(user)
    if (user) {
      res.json({message: 'Email is already in use.'});
      return
    }

    const hash = await hashPassword(result.value.password);
    delete result.value.confirmationPassword;
    result.value.password = hash;

    const newUser = await new User(result.value);
    await newUser.save();
    console.log(newUser);

    const token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      token: token, username: newUser.value.username, email: newUser.value.email,
      message: 'Registration successfully, go ahead and login.', file
    })

  } catch (error) {
    next(error)
  }
});


router.post(('/login'), async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, loginSchema);

    if (result.error) {
      res.json({message: "Your username or password is incorrect!"});
      return
    }
    console.log("Loggining...")
    console.log("Try to find " + result.value.username)


    const user = await User.find({username: result.value.username});
    console.log(user);
    if (user && await comparePassword(req.body.password, user.password)) {
      console.log('Okay, go! Creating token...');

      const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      updateUser(user, token);
      const user = await User.find({username: result.value.username});
      console.log(token);
      console.log(user);


      res.json({
        auth: true,
        token: token,
        message: 'You are accepted!',
        user: {username: user.username, email: user.email}
      });
    } else {//
      res.json({auth: false, token: null, message: 'Your username or password is incorrect!'});
    }
  } catch (e) {
    console.log(e);
  }
});

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

  const user = await User.find({token: token});

  console.log("Well... You are...");
  console.log(user);

  //console.log(isTokenExpired(token));
  if (!isTokenExpired(token)) {
    console.log("Let go...");
    res.send({
      auth: true,
      token: token,
      user: {username: user.username, email: user.email}
    })
  } else {
    console.log("Token is expired!");
    res.send({
      auth: false,
      token: null,
      user: {username: null, email: null}
    })
  }
  // res.send({ auth: false, token: null });
});

router.get('/logout', function (req, res) {
  res.send({auth: false, token: null});
});

module.exports = router;
