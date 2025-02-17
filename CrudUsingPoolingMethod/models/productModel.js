// productsService.js (or wherever you handle the products logic)
const promisePool = require("../utils/dbConnection");

const getAllproducts = async () => {
    try {
        const [rows] = await promisePool.execute("SELECT * FROM products");
        return rows; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; 
    }
};


const postproducts = async (name,price, category_id) => {
    try{

        const [result] = await promisePool.execute("INSERT INTO products (name,price,category_id) VALUES (?,?,?)", [name,price, category_id])
        return result

    }catch (error){
        console.log("Error inserting in products",error);
        throw error;
    }
}


const checkCategoryExists = async (category_id) => {
    const [rows] = await promisePool.execute(
        'SELECT id FROM categories WHERE id = ?',
        [category_id]
    );
    return rows.length > 0; 
};


const putproducts = async (id, name,price, category_id) => {
    try {
        const categoryExists = await checkCategoryExists(category_id);
        if (!categoryExists) {
            throw new Error(`Category with ID ${category_id} does not exist`);
        }

        const [rows] = await promisePool.execute(
            'UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?',
            [name, price, category_id, id]
        );

        return rows;
    } catch (error) {
        console.log("Error updating product:", error);
        throw error;
    }
}

const deleteproducts = async (id) => {
    try{

        const [rows] = await promisePool.execute("DELETE FROM products WHERE id = ?", [id]);
        return rows

    } catch (error){
        console.log("edit the products",error);
        throw error
    }
}


const TruncateData = async () => {
    try{

        const result = await promisePool.execute("TRUNCATE TABLE products");
        return result;

    }catch (error){
        console.log("error in trucate model", error);
        throw error;
    }
}


module.exports = {
    getAllproducts,
    postproducts,
    putproducts,
    deleteproducts,
    TruncateData
};
