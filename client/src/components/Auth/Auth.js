import React, { useState } from 'react';
import { Avatar,Button,Paper,Grid,Typography,Container, Icon} from '@material-ui/core'; 
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import { AUTH } from '../../constants/actionType';


const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((preShowPassword) => !preShowPassword)
   
//login or register form submit
    const handleSubmit = () => {

    } 

// form input fiels change
    const handleChange = () => {

    }

// sign In or sign Up field change
    const switchMode = () => {
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        handleShowPassword(false);
    }

//google login 
    const createOrGetUser = async ( response) =>{
      console.log(response);
      const result = jwt_decode(response.credential);
      console.log(result);

      try {
        dispatch({type:AUTH, data:{result}});
        history.push('/');

      } catch (error) {
        console.log(error);
      }

    }


    
  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3} >
            <Avatar className={classes.avatar} > 
                <LockOutlinedIcon />
            </Avatar>

            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                  </>
                )}

                <Input name='email' label='Email address' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  /> 
                {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
              </Grid>

              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                  { isSignup ? 'Sign Up' : 'Sign In'}
              </Button>

              <GoogleLogin
                  onSuccess={credentialResponse => {
                    createOrGetUser(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              
              <Grid container justify='flex-end'>
                  <Grid item> 
                      <Button onClick={switchMode} color='primary'>
                            { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign UP"}
                      </Button>
                  </Grid>
              </Grid>

            </form>

        </Paper>
    </Container>
  )
}

export default Auth