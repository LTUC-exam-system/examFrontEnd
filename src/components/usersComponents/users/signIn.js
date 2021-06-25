import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/signinContext';
// import { Link } from 'react-router-dom';

function SignIn(){
    const context=useContext(AuthContext);
    const [userEmail,setEmail]=useState('');
    const [password,setPassword]=useState('');

   const handleChangeEmail=(e)=>{
     setEmail(e.target.value);
   };
   const handleChangePass=(e)=>{
       setPassword(e.target.value);
   };
   const handleSubmit=(e)=>{
       e.preventDefault();
       e.target.reset();
       context.login(userEmail,password);
   };
   return(
       <>
       <form  onSubmit={handleSubmit}>
       <input name="Email" onChange={handleChangeEmail} type="email" placeholder="Email Adress" autoComplete="off" required/>
       <input name="password"  type="password" autoComplete="off" onChange={handleChangePass} required/>
       <button type="submit"></button>
       </form>
       </>
   );
};

export default SignIn;