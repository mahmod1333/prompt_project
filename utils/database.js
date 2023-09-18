import mongoose from "mongoose";
let itConnection=false;
export const connectToDB = async () =>{
    mongoose.set("strictQuery",true)
    if(itConnection){
        return;
    }
    try {
     
    await mongoose.connect(process.env.MONGODB_URI,{
        dbName:"share_prompet",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    itConnection=true;
    console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
    
  
}
