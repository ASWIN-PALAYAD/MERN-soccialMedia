import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'

import postRoutes from './routes/postsRoute.js'; 
import userRoutes from './routes/userRoute.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));  
app.use(cors());

//routers
app.use('/posts',postRoutes); 
app.use('/user',userRoutes);


const PORT = process.env.PORT || 5000;

//Data base connection
mongoose.connect( process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port ${PORT}`)))
    .catch((error)=> console.log(error.message)); 

// mongoose.set('useFindAndModify',false);    