const mongoose = require("mongoose");
const { cascadingDelete } = require("../middleware/userMiddleware")

const userAuth = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin","superadmin"],
        default:"user"
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    todo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todoTask"
    }]
},
{timestamps:true}
);

userAuth.pre("deleteOne", {document:true, query:false}, cascadingDelete)

User = mongoose.model("User",userAuth);

module.exports = User;