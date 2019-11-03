import mongoose from 'mongoose';
import '../schemes/modelSchema';

const model = mongoose.model('modelSchema');

export function getAuthorList() {
  return model.find({name: "Vitaliy"});
}

export function createModel(req) {
  console.log(req.body);
  const Model = new model({
    name: req.body.name,
    surname: req.body.surname,
    about: req.body.about,
    createdAt: new Date()
  });
  return Model.save();
}

export function deleteModel(req){
  return model.delete(req.body);
}

