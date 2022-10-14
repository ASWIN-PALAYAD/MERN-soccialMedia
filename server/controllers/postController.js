import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


//get all post
export const getPost = async(req,res) =>{
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

//create new post
export const createPost = async(req,res) =>{

    const post = req.body;

    const newPost = new PostMessage({...post, creator:req.userId, createdAt: new Date().toISOString()});

    try {

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        
        res.status(409).json({message:error.message});
    }
}


//update post
export const updatePost = async (req,res)=>{

    const {id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatedPost)
}

//deletePost
export const deletePost = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({message:'Post deleted successfully'});

}

//like post 
export const likePost = async(req,res) => {
    const {id} = req.params;
    console.log(req.userId);

    if(!req.userId) return res.json({message:'Unauthenticated user'});

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id === String(req.userId));

    if(index === -1){
        //like the post
        post.likes.push(req.userId);
    }else{
        //unlike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId) )
    }


    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);


}