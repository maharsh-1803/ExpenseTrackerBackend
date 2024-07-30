const express = require('express');
const app = express();
const mongoose =require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const userRouter = require('./routes/user.router')
const expenseRouter = require('./routes/expense.route')
const cors = require('cors')
const PORT = process.env.PORT;

const connnectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}

app.listen(PORT,()=>{
    connnectToMongoDB();
    console.log(`server is running on ${PORT}`)
})

app.use(cors({
    origin: ['https://expense-tracker-tau-one-93.vercel.app/' ,"http://localhost:5173"]
  }));
app.use(express.json());

app.use('/api/User',userRouter)
app.use('/api/Expense',expenseRouter)