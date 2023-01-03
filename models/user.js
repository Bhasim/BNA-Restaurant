import mongoose from "mongoose";
const { Schema } = mongoose;

let userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  plz: {
      type: String,
      trim: true,
    },
    Mobile : {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    book: { type: Schema.Types.Mixed, default: {} },
    cart: Array,
    comment: String,
    rate: Number,
    isChat:{type:Boolean,default:false}
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

