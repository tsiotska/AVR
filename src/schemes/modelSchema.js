import mongoose, {Schema} from 'mongoose';

const modelSchema = new Schema(
  {
    modelId: String,
    author:  String,
    description:  String,
    category:  String,
    screenName:  String
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

export const Model = mongoose.model('modelSchema', modelSchema);

