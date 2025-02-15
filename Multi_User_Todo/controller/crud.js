const Profile = require("../models/profile");
const Todo = require("../models/list");
const User = require("../models/userAuth");


// create a user profile
const CreateProfile = async (req, res) => {
    try{
        const {email, bio, age, location} = req.body;

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({"message":"User not found"});
        }

        let profile;
        // console.log(existingUser.profile)
        const profileData = await Profile.findById(existingUser.profile)
        if(existingUser.profile){
            profile = await Profile.findByIdAndUpdate(
                existingUser.profile,
                {bio,age,location},
                { new: true }
            );
        }
        else{
            profile = new Profile({
                bio,
                age,
                location
            })
        }
        let result
        result = await profile.save();
        existingUser.profile = profile._id;
        result = await existingUser.save();

        

        return res.status(201).json({result:profileData})

    } catch (error) {
        console.log(error, "My error");
    }
}



// create todo task
const CreateTodoTask = async (req,res) => {
    try{

        const {email, task, status} = req.body;

        if (!email){
            return res.status(404).json({"message":"User not found"})
        }

        const existingUser = await User.findOne({email});
        
        if (existingUser){
            const newTask = new Todo({
                task,
                status,
                user:existingUser._id
            });
            
            await newTask.save()
            await existingUser.todo.push(newTask._id)
            await existingUser.save()

            return res.status(201).json({
                newTask:newTask,
                User:existingUser
            });

        }else{
            return res.status(201).json({"message":"please write a correct user"});
        }

        

    } catch (error){
        console.log(error, "My error");
    }
}




// Get All data of todo based on user
const GetTaskData = async (req,res)=>{
    try{
        const userId = req.params.id; 

        const userTasks = await Todo.find({ user: userId });

        if (userTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        res.status(200).json(userTasks);

    } catch (error){
        console.log("my error", error)
    }
}



// Delete User for perticular id
const DeleteTodoTask = async (req,res) => {
    
    try{

        const taskId = req.params.id;
        if (!taskId){
            return res.status(200).json({"message":"Delete todo task"})
        }

        const task = Todo.findByIdAndDelete(taskId);
        if (!task){
            return res.status(404).json({"message":"Task is not found"});
        }

        const existingUser = await User.findOne({todo:taskId});
        if(!existingUser){
            return res.status(400).json({"message":"Task not found in user"});
        }

        existingUser.todo = existingUser.todo.filter(id => id.toString() != taskId.toString());
        
        result = existingUser.save()
        return res.status(200).json({todo:existingUser})


    } catch (error){
        console.log("my error", error);
    }
    
}




module.exports = {
    CreateProfile,
    CreateTodoTask,
    GetTaskData,
    DeleteTodoTask
}