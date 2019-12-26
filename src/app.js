import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';

import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

import {setUpConnection} from "./database/database";

import users from './routes/users';
import collections from './routes/collections';
import models from './routes/models';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next()
});


app.use('/static', express.static(path.join(__dirname, '../client/build/')));

app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/bundle.js'), function(err) {
    if (err) {
      res.status(500).send(err)
    }});
 // res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/bundle.js'));
});

app.get('/manifest.json', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/public/manifest.json'));
});

app.get('/style', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/style.css'));
});


app.use('/api/users', users);
app.use('/api/models', models);
app.use('/api/collections', collections);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+'/../client/public/index.html') , function(err) {
    if (err) {
      res.status(500).send(err)
    }})
});

async function start() {
  setUpConnection()
  app.listen(5000, () => console.log("started at 5000"));
}

start();

module.exports = app;


