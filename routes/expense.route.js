const { addExpense, getAllExpense, deleteExpese } = require('../controller/expense.controller');
const authToken = require('../middleware/AuthUser');

const router = require('express').Router();

router.post('/addExpense',authToken,addExpense)
router.get('/getAllExpense',authToken,getAllExpense)
router.delete('/deleteExpense/:id',authToken,deleteExpese)

module.exports = router;