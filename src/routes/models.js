const model = require('express').Router();
const path = require('path');
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import {createModel, updateModel} from '../CRUDs/modelCRUD';
import {verifyToken, checkAuth} from '../checkAuth';

//root defines a directory of model which client requires
let root = "";
//these all routes works for gltfLoader. You have to write only gltfLoader('/api/models/gltf?root=NAME')
model.get('/gltf', (req, res) => {
  root = req.query.root;
  console.log(root);
  res.sendFile('scene.gltf', {root: 'models/' + root + "/"}); //!!!
});

model.get('/scene.bin', (req, res) => {
  res.sendFile('scene.bin', {root: 'models/' + root + "/"})
});

model.use('/textures/', (req, res) => {
  let file = req.url.replace("/textures/", "");
  res.sendFile(file, {root: 'models/' + root + "/textures"})
});
//_______________________________________

const folder = './models';
model.get('/list', (req, res) => {
  let list = [];
  fs.readdirSync(folder).forEach((file, index) => {
    list[index] = file;
  });
  res.send(list);
});


import multer from 'multer';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'models/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage}).any();

model.post("/upload/model", checkAuth, function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({err});
      return;
    }
    if (req.body.modelId) {
      let dir = req.body.modelId;
      if (!fs.existsSync('models/' + dir + '/')) {
        fs.mkdirSync('models/' + dir + '/');
        fs.mkdirSync('models/' + dir + '/textures/');
      }

      for (let i = 0; i < req.files.length; i++) {
        let filename = req.files[i].originalname;
        // console.log(filename);
        let expansion = path.extname(req.files[i].originalname);
        console.log(expansion);

        if (expansion === ".bin" || expansion === ".gltf") {
          fsExtra.move('models/' + filename, 'models/' + dir + '/' + filename, function (err) {
            if (err) return console.error(err);
            console.log('success!')
          });
        } else {
          fsExtra.move('models/' + filename, 'models/' + dir + '/textures/' + filename, function (err) {
            if (err) return console.error(err);
            console.log('success!')
          });
        }
      }

      for (let i = 0; i < req.files.length; i++) {
        console.log(`File ${req.files[i].originalname} uploaded to ${req.files[i].path}`);
      }
      console.log("req");
      console.log(req.body);
      createModel(req.body.modelId);

      return res.status(200).send({success: true, modelId: dir});
    } else return res.status(200).send({success: false, message: "No modelId found"});
  });
});

//PROTECT THIS!
model.post("/update/model:modelId/information", function (req, res, next) {
  updateModel(req);
  return res.status(200).send({success: true});
});

module.exports = model;
