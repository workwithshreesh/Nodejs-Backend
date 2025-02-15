const express = require("express");
const {connectMongo} = require("./conn");
const authRouter = require("./router/authUser");
const crudRouter = require("./router/crud");
const adminCrud = require("./router/adminCrud");
const app = express();

app.use(express.json())
app.use("/auth",authRouter);
app.use("/crud",crudRouter);
app.use("/admin",adminCrud)

const startSever = async () =>{
    try{

        const PORT = 8000;
        const url = "mongodb://localhost:27017/practice";

        connectMongo(url).then(()=>console.log("mongo db is connected"));

        app.listen(PORT,()=>console.log("Server is started..."));

    } catch(error){
        console.log(error,"error in start server")
    }
}

startSever();