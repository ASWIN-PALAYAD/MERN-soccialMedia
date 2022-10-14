import { AUTH, UPDATE } from "../constants/actionType";
import * as api from '../api/index';

//sign in 
export const signin = (formData,history) => async(dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        dispatch({type:AUTH,data});

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

//sing up 
export const signup = (formData,history) => async(dispatch) =>{
    try {
        const {data} = await api.signUp(formData);

        dispatch({type:AUTH, data});

        history.push('/');
    } catch (error) {
        console.log(error);
        
    }
}