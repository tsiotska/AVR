import * as fs from "fs";

const router = require('express').Router();
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import {checkAuth} from '../checkAuth';
import {
  updateUser, findUser, hashPassword, comparePassword, createUser
} from "../CRUDs/userCRUD";
import path from "path";

//validation schemas
const registrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
});
// confirmationPassword: Joi.any().valid(Joi.ref('password')).required()

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
});


router.post(('/register'), async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, registrationSchema)
    if (result.error) {
      console.log(result.error)
      res.json(result.error.details.path[0] === "password" ? {message: "Please, enter correct email!"} :
        {message: "Don't use unappropriated symbols!"});
      return
    }

    const userWithTheSameName = await findUser("username", result.value.username);
    const userWithTheSameEmail = await findUser("email", result.value.email);

    if (userWithTheSameName) {
      res.json({registered: false, message: 'This username is already in use'});
      return
    } else if (userWithTheSameEmail) {
      res.json({registered: false, message: 'This email is already in use'});
      return
    }

    const hash = await hashPassword(result.value.password);
    delete result.value.confirmationPassword;
    result.value.password = hash;

    const newUser = await createUser(result);
    console.log("newUser");
    console.log(newUser);

    const token = await jwt.sign({id: newUser._id}, process.env.API_KEY, {
      expiresIn: 86400
    });

    await updateUser(newUser, "token", token);
    console.log(newUser);

    res.json({
      auth: true,
      user: {username: newUser.username, email: newUser.email},
      token: token,
      message: 'Registration successfully, go ahead and login.'
    })

  } catch (error) {
    next(error)
  }
});


router.post(('/login'), async (req, res, next) => {

    const result = Joi.validate(req.body, loginSchema);

    if (result.error) {
      res.json({message: "Your email or password is incorrect!"});
      return
    }

    let user = await findUser("email", result.value.email);

    if (user && await comparePassword(req.body.password, user.password)) {

      const token = await jwt.sign({id: user._id}, process.env.API_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });

      await updateUser(user, "token", token);
      const updatedUser = await findUser("token", token);

      res.json({
        auth: true,
        token: token,
        user: {username: updatedUser.username, email: updatedUser.email}
      })

    } else {
      res.json({auth: false, token: null, message: 'Your username or password is incorrect!'});
    }
  }
);


router.get('/profile', checkAuth, async (req, res) => {
  const user = await findUser("token", req.headers.authorization);

  if (user) {
    const token = await jwt.sign({id: user._id}, process.env.API_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });

    await updateUser(user, "token", token);

    res.send({
      auth: true,
      token: token,
      user: {username: user.username, email: user.email}
    })
  } else {
    console.log("Token is not correct");
    res.send({
      auth: false,
      token: null,
      user: {username: null, email: null}
    })
  }
});

router.get('/avatar', checkAuth, async (req, res) => {
  console.log("Sending avatar...");
  const user = await findUser("token", req.headers.authorization);
  if (user) {
    res.sendFile(user.imageName, {root: path.join(__dirname, '../../public/images/')});
  }
});

import multer from 'multer';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/images/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    let expansion = path.extname(file.originalname);
    req.newFilename = Date.now() + expansion;
    cb(null, req.newFilename);
  }
});

const upload = multer({storage: storage});

router.post('/updatePhoto', checkAuth, upload.single('image'), async (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    const user = await findUser("token", req.headers.authorization);
    const pathToImage = "public/images/" + user.imageName;
    if (user.imageName !== "defaultAva.jpg" && fs.existsSync(pathToImage)) {
      fs.unlink(pathToImage, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    }
    await updateUser(user, "imageName", req.newFilename);
    return res.sendFile(req.newFilename, {root: path.join(__dirname, '../../public/images/')});
  }
});

router.get('/logout', function (req, res) {
  res.send({auth: false, token: null, user: {username: null, email: null}});
});

module.exports = router;
