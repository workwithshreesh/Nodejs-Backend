const User = require("../models/userAuth");
const Profile = require("../models/profile");
const List = require("../models/list");



// Get All User
const GetAllUser = async (req, res) => {
    try {

        const allUser = await User.find();
        if (allUser.length == 0) {
            return res.status(200).json({ "message": "Dont have any user" });
        }

        return res.status(200).json({ users: allUser });

    } catch (error) {
        console.log("my error", error)
    }
}


// Delete the bulk user
const DeleteBulkUser = async (req, res) => {

    try {

        const userIds = req.body.userIds;

        const result = await User.deleteMany({
            _id: { $in: userIds }
        });

        if (result.deleteCount == 0) {
            return res.status(200).json({ "message": "No record matched to delete" });
        }

        return res.status(200).json({ message: `${result.deleteCount} users deleted successfully.` });


    } catch (error) {
        console.log("my error", error)
    }

}


// Add Bulk Data in future



module.exports = {
    GetAllUser,
    DeleteBulkUser,
}
