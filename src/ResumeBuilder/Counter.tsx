"use client";

import { useState } from "react";

import {
   loginUser,
   selectUserData
} from "../lib/redux/features/UserAuthentication/authenticationSlice";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import styles from "./Counter.module.css";
export const Counter = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUserData);
    const payload ={
        email:"oduguwa.israel22@gmail.com",
        password:"adeboyega"
    }
console.log(data)
    return (
        <div>
            <button onClick={() => dispatch(loginUser(payload))}>
Loginnjh
            </button>
        </div>
    );
};