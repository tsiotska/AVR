import mongoose, {Schema} from 'mongoose';

const modelSchema = new Schema({
    name: {type: String},
    author: {type: String},
    about: {type: String}
  },
  {
    timestamps: {
      createdAt: {type:Date},
      updatedAt: {type:Date}
    }
  });

export const Model = mongoose.model('modelSchema', modelSchema);

