import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import host from "./host";
export const getData = createAsyncThunk(
    "data/getData",
    async (payload, {getState}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const {user} = getState().auth;
        const { data } = await axios({
            method: "get",
            url: host+'/materill',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            query: {id:user.id}
        })
        return data;
    }
);
export const addData = createAsyncThunk(
    "data/addData",
    async (payload, {getState}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        // const id = getState().auth.user.id;
        // let formdata=new FormData();
        // formdata.append('images',payload.image)
        // formdata.append('data',JSON.stringify(payload.data))
        const response = await axios({
            method: "post",
            url: host+'/materill',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: payload,
        })
        window.location.replace('/myinventaris')
        return response.data;
    }
);
export const maintenance = createAsyncThunk(
    "data/maintenance",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "post",
            url: host+'/materill/maintenance',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: payload,
        })
        dispatch(getData());
        window.location.replace('/myinventaris')
        return 
    }
);
export const deleteData = createAsyncThunk(
    "data/deleteData",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "delete",
            url: host+'/materill',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: {id:payload},
        })
        dispatch(getData());
        return 
    }
);
const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        msg: null,
    },
    extraReducers:{
        [getData.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        [getData.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [getData.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        },
        [addData.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [addData.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.msg = action.payload.message;
        },
        [addData.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        },
        [maintenance.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [maintenance.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
        },
        [maintenance.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
})
export default dataSlice.reducer;