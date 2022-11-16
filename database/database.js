const mongoose=require("mongoose");
const {info,error, warn}=require("ps-logger");

const {MONGODB_URL}=process.env;

exports.connect=()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(
       info("Db Connected Successfully")
    )
    .catch((err)=>{
        warn(`DB connection Failed`);
        error(error.message);
        process.exit(1);
    })
}