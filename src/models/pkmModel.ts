import { Document, Schema, model } from 'mongoose';

export interface IPkm extends Document {
  name: string;
  type: string;
  level: number;
}

const schema = new Schema<IPkm>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      type: {
        type: String,
        required: true,
        unique: false,
      },
      level: {
        type: Number,
        required: true,
        unique: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default model<IPkm>('pkm', schema);