const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const QuesRouter = require('./Router/QuesRouter'); 
const app = express();
app.use(bodyParser.json());
app.use('/questions',QuesRouter);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});































// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json()); 
// const 
// mongoURI = 'mongodb://localhost:27017/yourDatabaseName'; 
// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB connected successfully!'))
//     .catch(err => console.error('MongoDB connection error:', err));

// const codeSchema = new mongoose.Schema({
//     code: { type: String, required: true }
// });

// const Code = mongoose.model('Code', codeSchema);
// app.post('/api/code', async (req, res) => {
//     try {
//         const newCode = new Code({ code: req.body.code });
//         await newCode.save();
//         console.log(newCode);
//         res.status(201).send('Code saved successfully!');
//     } catch (error) {
//         console.error('Error saving code:', error);
//         res.status(500).send('Error saving code');
//     }
// });

// app.get('/api/code', async (req, res) => {
//     try {
//         const codes = await Code.find(); 
//         res.status(200).json(codes); 
//     } catch (error) {
//         console.error('Error fetching codes:', error);
//         res.status(500).send('Error fetching codes');
//     }
// });
// app.delete('/api/code', async (req, res) => {
//     try {
//         await Code.deleteMany({}); // Delete all code entries
//         res.status(200).send('All codes deleted successfully!'); // Success response
//     } catch (error) {
//         console.error('Error deleting all codes:', error);
//         res.status(500).send('Error deleting all codes'); // Error response
//     }
// });


// const PORT =5000;
// app.listen(PORT, () => {
//     console.log(`running on http://localhost:${PORT}`);
// });