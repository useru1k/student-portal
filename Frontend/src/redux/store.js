import {configureStore} from '@reduxjs/toolkit';
import codeReducer from './codeSlice';
import questionReducer from './questionSlice';
const store=configureStore({
    reducer:{
        codes:codeReducer,
        questionCode:questionReducer,
    }
})


export {store};