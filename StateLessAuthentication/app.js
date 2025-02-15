const express = require("express")
const {connectMongo} = require("./conn")
const authRouter = require("./router/userAuth")
app = express()
app.use(express.json());

app.use("/auth",authRouter);

async function startServer(){
    try{
        const PORT = 8000
        const url = "mongodb://localhost:27017/practice";
        await connectMongo(url).then(()=>console.log("mongodb is connected..."));
        app.listen(PORT,()=>console.log("Server is started"))
    } catch (error){
        console.log(error,"error in app.js");
    }
}


startServer()