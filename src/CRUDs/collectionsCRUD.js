import '../schemas/modelSchema';
import {Model} from '../schemas/modelSchema';

export function extractModelsData(field, value, projection) {

  if (projection) {
    if (!Array.isArray(projection)) {
      projection = [projection];
    }
    projection = projection.reduce(function (result, item) {
      console.log("item");
      result[item] = true;
      return result;
    }, {});
  }

  return Model.find({[field]: value},
    {_id: 0, ...projection})
    .then((data) => {
        console.log(data);
        return data;
      }
    ).catch((err) => console.log(err))
}


export function findCollection(type, value) {
  return Model.find({[type]: value})
    .then((data) => {
      console.log(data);
      return data;
    }
  ).catch((err) => console.log(err))
}

