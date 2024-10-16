
const mongoose= require('mongoose');
const mongourl='mongodb+srv://admin:admin@nivash.nrt23.mongodb.net/?retryWrites=true&w=majority&appName=nivash'
mongoose.connect(mongourl)
    .then(()=>console.log('db connected'))
    .catch(err => console.log('db error'));
module.exports=mongoose;