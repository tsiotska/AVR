import mongoose, {Schema} from 'mongoose';

const modelSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: {type:String},
  author: {type:String},
  about: {type:String},
  createdAt: {type:Date}
});

const model = mongoose.model('modelSchema', modelSchema);
