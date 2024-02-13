/**
 * @format
 */

import {createSlice} from '@reduxjs/toolkit';
import RealmUserService from '../utils/RealmUserService';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: "ls_sqlite"
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            RealmUserService.addUser(JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null;
            RealmUserService.deleteUser()
        },
    }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;