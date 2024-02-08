const express = require("express")
const {open} =require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const cors = require("cors");
const bcrypt = require('bcrypt')
const { request } = require("http")


const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const dbPath = path.join(__dirname,"hostelDataBase.db")

let db = null;

const initializeDBAndServer = async()=>{

    try {
       db = await open({
            filename:dbPath,
            driver:sqlite3.Database,
        })
        app.listen(4000, ()=>{
            console.log("Sever Running at http://localhost:4000")
        })
    } catch (error) {
        console.log(`DB error:${error.message}`);
        process.exit(1)
    }
}

initializeDBAndServer()


app.post("/sign/",async(request,response)=>{
const {username,password} =request.body
const hashedPassword = await bcrypt.hash(request.body.password,10)
const findUserQuery = `select * from user where username ='${username}'`
const userData = await db.get(findUserQuery)
if(userData !== undefined){
    response.status(400);
   response.json({message:"User already exits"})
}else{

    const addUserDetails = `insert into user(username,password)
    values('${username}','${hashedPassword}');`;
    await db.run(addUserDetails)
    response.status(200)
    response.json({ message: "Added user details" ,hashedPassword:hashedPassword})
    
}
})

app.post("/login/", async(request,response) => {
    const{username,password} = request.body
    const findUserQuery = `select * from user where username='${username}'`
    const userDb  = await db.get(findUserQuery)
    if(userDb === undefined){
        response.status(400)
        response.json({message:"User not Resgister"})
    }else{
        const comparePassword = await bcrypt.compare(password,userDb.password)
        if(comparePassword === true){
            response.status(200)
            response.json({message:"Login Success!"})
        }else{
            response.status(400)
            response.json({message:"Invalid Password"})
        }

    }
})

