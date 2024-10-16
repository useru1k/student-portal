import axios from 'axios';
const API = "http://localhost:5000"; 
const getAll = () => axios.get(`${API}/questions/all`);
const addQuestion=(question)=>axios.post(`${API}/questions/add`,question);
const getQuestion=(questionId)=>axios.get(`${API}/questions/${questionId}`);
export{getAll,addQuestion,getQuestion};