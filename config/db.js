
const mongoose= require('mongoose');
const connectDB=async()=>{
   try{
    await mongoose.connect(process.env.DB_URL)
    console.log('connected to db');
   }catch(error){
    console.log(error);
   }
   
}
module.exports=connectDB