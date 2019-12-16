const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import path from 'path';

import {setUpConnection} from "./database/database";
import collections from './routes/collections';
import models from './routes/models';

const app = express();

//app.use(cors('localhost:3000'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.get('/index', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/public/index.html'));
});
app.get('/bundle.js', function(req,res){
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/bundle.js'));
});
app.get('/manifest.json', function(req,res){
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/public/manifest.json'));
});
app.get('/style', function(req,res){
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/style.css'));
});

app.use('/api/models', models);
app.use('/api/collections', collections);

//app.use('/api/login', auth);
//app.use('/api/users', list);

async function start() {
  await setUpConnection();
  app.listen(5000, () => console.log("started at 5000"));
}

start();

module.exports = app;


