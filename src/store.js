import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";
import authReducer from "./features/authSlice";
export default configureStore({
    reducer:{
        auth:authReducer,
        data:dataReducer
    },
    devTools: false
})