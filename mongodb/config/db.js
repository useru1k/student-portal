
const mongoose= require('mongoose');
const mongourl='VALUE'
mongoose.connect(mongourl)
    .then(()=>console.log('db connected'))
    .catch(err => console.log('db error'));
module.exports=mongoose;
