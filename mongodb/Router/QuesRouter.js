const express = require('express');
const router = express.Router();
const Questions = require('../model/QuesModel');
router.post('/add', async (req, res) => {
    try {
        const {title} = req.body;
        if(!title){
            return res.status(400).json({message: "Title is required"});
        }
        const Question = new Questions(req.body); 
        const saveData = await Question.save(); 
        return res.status(201).json(saveData);
    } catch(error){
        console.error('Error saving:', error); 
        return res.status(500).json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const questionId = req.params.id; 
        const Question = await Questions.findOne({questionId: questionId });
        if (!Question) {
            return res.status(404).json({message:"Question not found"});
        }
        res.status(200).json(Question);
    } catch(error){
        res.status(500).json({message:"Error:", error});
    }
});
router.get('/all', async (req, res) => {
    try {
        const data = await Questions.find();
        res.status(200).json(data);
    } catch(error){
        res.status(500).json({message:"Error retrieving questions",error});
    }
});
module.exports=router;