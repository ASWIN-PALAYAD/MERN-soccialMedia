import React from 'react'
import useStyle from './styles';
import Post from './Post/Post'
import { useSelector } from 'react-redux';


const Posts = () => {

  const posts = useSelector((state)=> state.posts);
  const classes = useStyle();
  console.log(posts);


  return (
    <>
        <div>Posts</div>
        <Post/>
        <Post/>


    </>
  )
}

export default Posts