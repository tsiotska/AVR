import '../schemas/modelSchema';
import {Model} from '../schemas/modelSchema';

export function extractModelsData(field) {
  return Model.find({}, {_id: 0, [field]: 1}, function (err, data) {
    if (err) return console.log(err);
    console.log("Successfully found ");
  }).sort({field: 1}).distinct(field);
}

export function findCollection(type, value) {
  return Model.find({[type]: value}, function (err, data) {
    if (err) return console.log(err);
    console.log("Successfully found ");
  });
}
