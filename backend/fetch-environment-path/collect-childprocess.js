const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');

const getPythonPath = () =>{
    return new Promise((resolve,reject) => {
        let command;
        if (process.platform === 'win32') {
            command = 'where python'; }
        else{
            command = 'which python';
        }
        exec(command,(error, stdout, stderr) => {
            if(error)
                reject(`Error finding Python: ${error.message}`);
            else if (stderr)
                reject(`stderr : ${stderr}`);
            else
                resolve(stdout.trim());
        })
    })
};
// GetPythonpath end here

const getJavaPath = () => {
    return new Promise((resolve,reject) => {
        let command;
        if (process.platform === 'win32') {
            command = 'where java'; }
        else{
            command = 'which java';
        }
        exec(command,(error,stdout,stderr)=>{
            if(error)
                reject(`Error finding Java ${error.message}`)
            else if (stderr)
                reject(`stderr : ${stderr}`);
            else
                resolve(stdout.trim());
        })
    })
}
// get java path end here

const getCPath = () => {
    return new Promise((resolve,reject) => {
        let command;
        if (process.platform === 'win32') {
            command = 'where gcc'; }
        else{
            command = 'which gcc';
        }
        exec(command,(error,stdout,stderr)=>{
            if(error)
                reject(`Error finding C Compiler : ${error.message}`)
            else if (stderr)
                reject(`stderr : ${stderr}`);
            else
                resolve(stdout.trim());
        })
    })
}

const getCppPath = () => {
    return new Promise((resolve,reject) => {
        let command;
        if (process.platform === 'win32') {
            command = 'where g++'; }
        else{
            command = 'which g++';
        }
        exec(command,(error,stdout,stderr)=>{
            if(error)
                reject(`Error finding C++ Compiler : ${error.message}`)
            else if (stderr)
                reject(`stderr : ${stderr}`);
            else
                resolve(stdout.trim());
        })
    })
}

const sendToServer = async () => {
    try{
        const PYTHONPATH = await getPythonPath();
        const JAVAPATH = await getJavaPath();
        const CPATH = await getCPath();
        const CPPPATH = await getCppPath();
        const paths = {
            python : PYTHONPATH,
            java : JAVAPATH,
            c : CPATH,
            cpp : CPPPATH
        };
        console.log(paths)
        const response = await axios.post('http://localhost:3000/submit',paths);
        console.log("Finished");
        process.exit(0);
    }
    catch(error){
        console.log('Error : ',error);
        process.exit(1); 
    }
};
sendToServer();
