import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from 'react-cookies';

const API = 'https://quiz-ltuc.herokuapp.com';

const users=createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
       setUsers(state,action){
           state.users=action.payload;
       },
       pushUser(state,action){
        if (state.users&&action.payload){
            state.users.push(action.payload);
        }
       }

    }
});

export const getUsers=()=>async (dispatch)=>{
    const data=await axios({
        method:"get",
        url:`${API}/users`,
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${cookie.load('auth')}`
        }
    });
    dispatch(setUsers(data.results));
    return data.results;

};
export const addUsers = (obj) => async (dispatch) => {
    const data = await axios({
      method: 'post',
      url: `${API}/adduser`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.load('auth')}`,
      },
      data: JSON.stringify(obj),
    });
    if (data.token) {
      await dispatch(getUsers());
    }
};
export const {setUsers,pushUser}=users.actions;

export default users.reducer;