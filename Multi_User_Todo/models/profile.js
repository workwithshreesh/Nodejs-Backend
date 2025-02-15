const mongoose = require("mongoose");

const userProfile = mongoose.Schema({
    bio:{
        type:String,
        required:false,
    },
    age:{
        type: Number,
        required:false,
    },
    location:{
        type:String,
        required:false,
    },
},
 {timestamps:true}
);


Profile = mongoose.model("Profile",userProfile);

module.exports = Profile
