import mongoose from "mongoose"
let { model, Schema } = mongoose




// let chat = new Schema({
//     input: String,
//     room: String,
//     signedIn:String
// })

let chef = new Schema({
    isOnline:{type:Boolean,default:false}
})

export let Chef = model("chef", chef)

