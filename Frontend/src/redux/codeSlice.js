import { createSlice } from "@reduxjs/toolkit";
const codeSlice=createSlice({
    name:'codes',
    initialState:{
        codes:["",""],
    },
    reducers:{
        setCodes:(state,action)=>{
            state.codes=action.payload;
        },
        updateCode:(state,action)=>{
            const{index,value}=action.payload;
            state.codes[index]=value;
        },
    }
})
export const {setCodes,updateCode}=codeSlice.actions;
export default codeSlice.reducer;