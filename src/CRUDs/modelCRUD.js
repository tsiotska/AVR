import '../schemes/modelSchema';
import mongoose from 'mongoose';
import {Model} from '../schemes/modelSchema';

export function getAuthorList(req) {
  return Model.find({username: req.body.username}, function (err, user) {
    if (err) return console.log(err);
    console.log("Successfully found " + user);
  });
}

export function createModel(modelId) {
  console.log("Creating model...");
  console.log(modelId);

  const model = new Model({
      _id: new mongoose.Types.ObjectId().toHexString(),
      modelId: modelId,
    },
    {
      timestamps: {
        createdAt: new Date()
      }
    });
  return model.save(function (err) {
    if (err) return console.log(err);
    console.log("Successfully saved " + Model);
  });
}

export function updateModel(req) {
  console.log("Updating model...");
  console.log(req.body);

  return Model.updateOne({modelId: req.body.modelId}, {}).set({
      modelId: req.body.modelId,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category
    },
    {
      timestamps: {
        updatedAt: new Date()
      }
    }, function (err) {
      if (err) return console.log(err);
      console.log("Successfully saved " + Model);
    });
}


export function deleteModel(req) {
  return Model.delete(req.body, function (err) {
    if (err) return console.log(err);
    console.log("Successfully deleted");
  });
}

