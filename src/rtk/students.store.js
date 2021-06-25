import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from 'react-cookies';

const api = 'https://quiz-ltuc.herokuapp.com';

const students = createSlice({
    name: "students",
    initialState: {
        students: []
    },
    reducers: {
        setStudents(state, action) {
            state.students = action.payload;
        }
    }
});

export const getStudents = () => async (dispatch) => {
    let data = await axios({
        method: "get",
        url: `${api}/students`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${cookie.load('auth')}`,
        }
    });
    console.log(data);
    dispatch(setStudents(data.data));
    // return data.data;

};
export const addStudent = (obj) => async (dispatch) => {
    const data = await axios({
        method: 'post',
        url: `${api}/onestudent`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.load('auth')}`
        },
        data: JSON.stringify(obj),

    });
   
    if (data.results) {
        await dispatch(getStudents())
    }

}
export const updatStudentData = (obj) => async (dispatch) => {
    const data = await axios({
        method: 'put',
        url: `${api}/generaterefcode/${obj._id}`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.load('auth')}`
        },
    });
    if (data === "done successfuly") {
        await dispatch(getStudents())
    }
}

export const { setStudents, } = students.actions;
export default students.reducer;