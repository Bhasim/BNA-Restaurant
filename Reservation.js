import mongoose from "mongoose"
let { model, Schema } = mongoose




let reservation = new Schema({
   date: String,
   hour: String,
   user:{type:Schema.Types.Mixed,default:{}}
}, { minimize: false })

export let Reservation = model("reservation", reservation)


