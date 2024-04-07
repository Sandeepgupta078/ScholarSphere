import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import profileReducer from "../slices/profileSlice.jsx";
import cartReducer from "../slices/cartSlice.jsx";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
})

export default rootReducer;