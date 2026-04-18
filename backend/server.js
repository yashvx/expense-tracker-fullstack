
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/expensesDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: String
});

const Expense = mongoose.model("Expense", expenseSchema);

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post("/expenses", async (req, res) => {
  const { amount, category, date } = req.body;

  const newExpense = new Expense({ amount, category, date });
  await newExpense.save();

  res.json({ message: "Saved" });
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});