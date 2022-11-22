require('dotenv').config()
require("./database/database").connect()
const express=require('express');
const { db } = require('./database/model/user');
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the CodeSpace Express server')
})

app.post("/register",async(req,res)=>{
    try {
        //get all data from body
        //all the data should exists
        //check if user already exists
        //encrypt the password
        // save the user in db
        // generate a token for user and send it
    } catch (error) {
        console.error(error);
    }
})


module.exports=app;