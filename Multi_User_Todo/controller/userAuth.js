const User = require("../models/userAuth");
const uuid = require("uuid");
const bcrypt = require("bcrypt")

const HandleSingup = async (req,res) =>{
    const {email,name,password} = req.body;

    if (!email || !name || !password){
        return res.status(400).json({"message":"Bad request"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({"message":"user is already exist"})
    }
    const userId = uuid.v4()
    const slat = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,slat)

    const result = await User.create({
        userId,
        email,
        password:hashedPassword,
        name
    });

    return res.status(201).json({"message":"user is created","Response":result});

}



const HandleSignin = async (req,res) =>{
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({"message":"Please provide a user and password"});
    }

    const existingUser = await User.findOne({email});
    if (existingUser){
        if ((existingUser.email == email) && (bcrypt.compare(existingUser.password, password))){
            return res.status(200).json(existingUser);
        }else{
            return res.status(400).json({"message":"password is incorrect"})
        }
    }else{
        return res.status(400).json({"message":"User is not exist"})
    }
}


module.exports = {
    HandleSingup,
    HandleSignin
}