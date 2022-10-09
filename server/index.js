import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/postsRoute.js'; 

const app = express();



app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//routers
app.use('/posts',postRoutes);


const CONNECTION_URL = "mongodb+srv://aswinsocialmedia:aswinsocialmedia12345@cluster0.guai1ux.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

//Data base connection
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port ${PORT}`)))
    .catch((error)=> console.log(error.message));

// mongoose.set('useFindAndModify',false); 