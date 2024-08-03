import React, { useState } from 'react'
import {auth,googleProvider} from "../config/firebase-config";
import {createUserWithEmailAndPassword,signOut,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";

export default function Authentication() {
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    console.log(auth?.currentUser?.email);
    const signUp = async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }
        catch(err){console.log(err)};
    } 
    const SignIn=async()=>{
        try {
            await signInWithEmailAndPassword(auth,email,password);
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async()=>{
        try{
            await signOut(auth);
        }
        catch(err){console.log(err)};
    }
    const signInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }
        catch(err){console.log(err)};
    }
  return (
    <div>
      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={signUp}>SignUp</button>
      <button onClick={SignIn}>SignIn</button>
      <button onClick={signInWithGoogle}>SignIn wiht Google</button>
      <button onClick={logout}>LogOut</button>
    </div>
  )
}
