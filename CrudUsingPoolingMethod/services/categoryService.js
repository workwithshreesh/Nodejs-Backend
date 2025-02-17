const categoryModel = require("../models/categoryModel")

const getAllCategory = async () => {
    try {
        const rows = categoryModel.getAllCategory();
        return rows;
    } catch (error) {
        console.error("Error fetching categories from DB:", error);
        throw error;
    }
};


const postCategory = async (name) => {
    try {

        const result = categoryModel.postCategory(name)
        if (!result) {
            return "Data is in valid"
        }
        return result

    } catch (error) {
        console.log("Error inserting in categories", error);
        throw error;
    }
}


const putCategory = async (id, name) => {
    try {

        const result = categoryModel.putCategory(id, name);
        if (!result) {
            return "Data is invalid";
        }
        return result

    } catch (error){
        console.log("edit the category", result);
        throw error;
    }
}



const deleteCategory = async (id) => {
    try {

        const result = categoryModel.deleteCategory(id);
        if (!result) {
            return "Data is invalid";
        }
        return result

    } catch (error){
        console.log("edit the category", result);
        throw error;
    }
}


const TruncateData = async () => {
    try{

        const result = await categoryModel.TruncateData();
        return result;

    } catch (error){
        console.log("error in trucate service", error);
        throw error
    }
}


module.exports = {
    getAllCategory,
    postCategory,
    putCategory,
    deleteCategory,
    TruncateData,
};
