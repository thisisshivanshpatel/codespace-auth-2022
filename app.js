require('dotenv').config()
const express=require('express');
const app=express()

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the CodeSpace Express server')
})

module.exports=app;