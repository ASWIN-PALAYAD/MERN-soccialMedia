import React,{useState,useEffect} from 'react'
import {Container,Grow,Grid,Paper} from '@material-ui/core';
import { useDispatch} from 'react-redux';

import Pagination from '../Pagination.jsx';
import {getPosts} from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import useStyle from './styles';



const Home = () => {

  const [currentId, setCurrentId] = useState(null); 

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,dispatch])



  return (
    <Grow in>
          <Container>
              <Grid container className={classes.mainContainer} justify="space-between" alignItems='stretch' spacing={3} >
                  <Grid item xs={12} sm={7}>
                      <Posts setCurrentId={setCurrentId}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <Form currentId={currentId} setCurrentId={setCurrentId}/>
                      <Paper  elevation={6}>
                          <Pagination/>
                      </Paper>
                  </Grid>
              </Grid>
          </Container>
      </Grow>
  )
}

export default Home