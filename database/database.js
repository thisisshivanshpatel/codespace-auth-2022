const mongoose=require("mongoose");

const {MONGODB_URL}=process.env;

exports.connect=()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then()
    .catch((err)=>{
        console.log(`DB connection Failed`);
        console.log(error.message);
        process.exit(1);
    })
}