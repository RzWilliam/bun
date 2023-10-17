import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  mail: string;
  password: string;
}

const schema = new Schema<IUser>(
    {
      mail: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default model<IUser>('user', schema);