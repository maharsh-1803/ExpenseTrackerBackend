const Expense = require("../model/expense.model")
const mongoose = require('mongoose')

const addExpense = async (req, res) => {
    try {
        const { title, description, amount, category } = req.body
        const tokenData = req.user;
        const id = tokenData._id;
        const newExpense = new Expense({
            userId: id,
            title,
            description,
            amount,
            category
        })

        await newExpense.save();
        return res.status(200).json({
            success: true,
            message: "Expense added successfully",
            expense: newExpense
        })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllExpense = async (req, res) => {
    try {
        const tokenData = req.user;
        const id = tokenData._id;
        const expenses = await Expense.find({ userId: id });
        if (!expenses) {
            return res.status(404).send({ message: "expenses not found" })
        }
        const totalAmount = await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(id) } },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount'
                    }
                }
            }
        ])
        return res.status(200).json({
            success: true,
            message: "expenses retrived successfully",
            totalAmount: totalAmount[0] ? totalAmount[0].total : 0,
            expenses: expenses
        })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const deleteExpese = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).send({ message: "Expense not found" })
        }
        return res.status(200).json({ message: "expense delete successfully", expense: expense })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {};

        if (req.body.title) updateData.title = req.body.title;
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.amount) updateData.amount = req.body.amount;
        if (req.body.description) updateData.description = req.body.description;

        const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense: updatedExpense,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


module.exports = {
    addExpense,
    getAllExpense,
    deleteExpese,
    updateExpense
}