import mongoose from "mongoose";

const schema = new mongoose.Schema({
    roleValue:{
        type:String,
        required:true,
        unique:true,
    },
    roleName:{
        type:String,
        required:true,
    },
    roleDescription:{
        type:String,
    },
    permissions:[String]
},{timestamps:true})

export const Role = mongoose.model("Role", schema)