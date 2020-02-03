import '../schemas/modelSchema';
import mongoose from 'mongoose';
import {Model} from '../schemas/modelSchema';


export function createModel(modelId) {
  const model = new Model({
      _id: new mongoose.Types.ObjectId().toHexString(),
      modelId: modelId,
      screenName: "default.jpg"
    },
    {
      timestamps: {
        createdAt: new Date()
      }
    });
  return model.save(function (err) {
    if (err) return console.log(err);
    //console.log("Successfully saved " + Model);
  });
}

export function updateModel(data) {
  return Model.updateOne({modelId: data.modelId}, {$set: data })
}


export function deleteModel(req) {
  return Model.delete(req.body, function (err) {
    if (err) return console.log(err);
    console.log("Successfully deleted");
  });
}

