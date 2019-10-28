const model = require('express').Router();
import * as fs from 'fs';


//root defines a directory of model which client requires
let root = "";
//these all routes works for gltfLoader. You have to write only gltfLoader('/api/models/gltf?root=NAME')
model.get('/gltf', (req, res) => {
  root = req.query.root;
  console.log(root);
  res.sendFile('scene.gltf', {root: 'models/' + root + "/"});
});

model.get('/scene.bin', (req, res) => {
  res.sendFile('scene.bin', {root: 'models/' + root + "/"})
});

model.use('/textures/', (req, res) => {
  let file = req.url.replace("/textures/", "");
  console.log(file);
  res.sendFile(file, {root: 'models/' + root + "/textures"})
});
//_______________________________________
const folder = './models';

model.get('/list', (req, res) => {
  let list =[];
  fs.readdirSync(folder).forEach((file, index) => {
    list[index] = file;
  });
  res.send(list);
});

module.exports = model;

