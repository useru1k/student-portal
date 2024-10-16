const mongoose=require('../config/db')
const QuesModel = new mongoose.Schema({
    questionId: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    Time: {
        type:Number,
        required: true
    },
    Constrain: {
        type: String,
        required: false
    },
    blackword: {
        type: String,
        required: false
    },
    whiteword:{
        type:String,
        required: false
    },
    codeSnippet:{
        type:String,
        required:false
    },
    language:{
        type:String,
        required:true
    },
    mark:{
        type:Number,
        required:true
    },
    testcases: [
        {
            testcase: {
                type: String,
                required: true 
            },
            output:{
                type:String,
                required:true
            },
            mark: {
                type: Number,
                required: true 
            },
            visibility: {
                type: Boolean,
                required: true 
            }
        }
    ] ,
    tags:{
        type:[String],
        default:[]
    },
    NegativeMark:{
        type:Number,
        required:false
    },
    IsNegative:{
        type:Boolean,
        required:true
    }
});
QuesModel.pre('save', async function(next) {
    if (this.isNew) { 
        const lastQuestion = await this.model('Questions').findOne({}, {}, { sort: { 'questionId': -1 } });
        this.questionId = lastQuestion ? lastQuestion.questionId + 1 : 1; 
    }
    next();
});
const Questions = mongoose.model('Questions',QuesModel);

module.exports=Questions;