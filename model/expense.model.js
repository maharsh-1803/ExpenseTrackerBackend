const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        enum:['Bill','Other','Recharge','Grocery','Food'],
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Expense = mongoose.model('Expense',expenseSchema);
module.exports=Expense