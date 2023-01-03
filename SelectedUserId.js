import mongoose from "mongoose"
let { model, Schema } = mongoose

let selectedUser = new Schema({
    selectedUserId:{type:String,default:""}
})

export let SelectedUser = model("selectedUser", selectedUser)


