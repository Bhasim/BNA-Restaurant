import mongoose from "mongoose"
let { model, Schema } = mongoose




// let chat = new Schema({
//     input: String,
//     room: String,
//     signedIn:String
// })

let chat = new Schema({
    chat:Array
})

export let Chat = model("chat", chat)


