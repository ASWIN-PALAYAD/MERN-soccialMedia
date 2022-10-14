import React from 'react';
import { CardActions, CardContent, CardMedia, Button, Typography, Card  } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeletecIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyle from './styles';

import { useDispatch } from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';





const Post = ({post,setCurrentId}) => {
  
  const classes = useStyle(); 
  const dispatch = useDispatch();  
  const user = JSON.parse(localStorage.getItem('profile'));
  
  //like component
  const Likes = () => {
    console.log(user);

    if(post.likes.length > 0 ){
      return post.likes.find((like)=> like === (user?.result?.sub || user?.result?._id))
      ? (
          <>
            <ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `you and ${post.likes.length - 1}others` : `${post.likes.length}like${post.likes.length > 1 ? 's' : ''}`}
          </>
      ) : (
        <>
        <ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
        </>
      )
    }

    return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
  }

  return (
    
    <Card className={classes.card} >

      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

      <div className={classes.overlay} >
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>

      {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2} > 
          <Button style={{color:'white'}} size='small' onClick={()=>{setCurrentId(post._id)}} >
            <MoreHorizIcon fontSize='default' />
          </Button>
      </div>
      )}

      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' >{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </div>

      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p' gutterBottom>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>

        <Button size='small' color='primary' disabled={!user?.result} onClick={()=>{dispatch(likePost(post._id))}} >
          <Likes/>
        </Button>

        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        
        <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))} >
          <DeletecIcon fontSize='small'/>
          Delete
        </Button>

        )}


      </CardActions>

    </Card>

  )
}

export default Post