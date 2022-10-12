import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import visibility from '@material-ui/icons/Visibility';
import  visibilityOff from '@material-ui/icons/VisibilityOff';

const input = ({half,name,handleChange,label,autoFocus,type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} >
      <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={name === 'password' && {
          endAdornment:(
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <visibility /> : <visibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } }
      />
    </Grid>
  )
}

export default input