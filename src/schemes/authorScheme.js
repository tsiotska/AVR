import mongoose, {Schema} from 'mongoose';

//const Schema = mongoose.Schema;

const authorScheme = new Schema({
  name: {type:String},
  surname: {type:String},
  about: {type:String},
  createdAt: {type:Date}
});

const author = mongoose.model('authorScheme', authorScheme);
