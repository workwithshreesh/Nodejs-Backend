const mongoose = require("mongoose");

const cascadingDelete = async (next) =>{
    try{

        await mongoose.model("Profile").deleteOne( {_id : this.profile});

        await mongoose.model("todoTask").deleteMany({user: this._id});

        next();

    } catch(error){
        console.log(error,"error in cascading middleware")
    }
}

module.exports = {
    cascadingDelete,
    
}