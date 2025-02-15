const User = require("../models/userModel");
const uuid = require("uuid")
const bcrypt = require("bcrypt")


const HandleSignup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const uuserId = uuid.v4()

        if (!email || !name || !password) {
            res.status(400).json({ "message": "Bad request" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(201).json({ "message": "User is already exist" });
        } 

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            result =await User.create({
                uuserId,
                email,
                name,
                password: hashedPassword,
            });

            return res.status(201).json({"message":result})
        

        
    } catch (error) {
        console.log(error, "error in signup controller");
    }
}



const HandleLogin = async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({"message":"please enter user and password"})
    }

    const existingUser = await User.findOne({email});



    if (existingUser){
        if((existingUser.email == email) && (bcrypt.compare(existingUser.password, password))){
            return res.status(200).json({"message":"Login is successfull"});
        }else{
            return res.status(400).json({"message":"password is incorrect"});
        }
    }else{
        return res.status(404).json({"message":"User not found"});
    }
}


module.exports = {
    HandleSignup,
    HandleLogin
}