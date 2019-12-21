import mongoose, {Schema} from 'mongoose';

const modelSchema = new Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
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

