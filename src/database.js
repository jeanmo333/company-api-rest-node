import mongoose from 'mongoose';



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
})
 .then(db => console.log("db is connect"))
 .catch(error => console.log(error))