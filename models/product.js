import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

/*let reciepes = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    ing: {
      type: {},
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("datas", reciepes);*/

let recipes = new mongoose.Schema({
    id:String,
    name:String,
    img:String,
    ing:Array,
    type:String,
    price:Number,
    quantity:{type:Number,default:1},
    rate:{type:Number,default:1}
})
export default mongoose.model("datas", recipes);