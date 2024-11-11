import {configureStore} from '@reduxjs/toolkit';
import codeReducer from './codeSlice';
const store=configureStore({
    reducer:{
        codes:codeReducer
    }
})


export {store};