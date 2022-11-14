const app=require('./app');
const {PORT}=process.env;

app.listen(PORT,()=>{
    console.log(`SERVER IS LISTENING AT PORT ${PORT}`);
})

app.listen()