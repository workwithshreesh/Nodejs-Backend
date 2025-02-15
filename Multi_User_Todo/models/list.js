const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task:{
        type:String,
        required:false
    },
    status:{
        type:String,
        enum: ["pending","in-progress","completed"],
        default: "pending"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});


todoTask = mongoose.model("todoTask",todoSchema);

module.exports = todoTask;