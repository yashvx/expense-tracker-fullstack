const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let expenses = [];

app.get("/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/expenses", (req, res) => {
    const { amount, category, date } = req.body;

    expenses.push({ amount, category, date });

    res.json({ message: "Expense added" });
});

app.delete("/expenses/:index", (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < expenses.length) {
        expenses.splice(index, 1);
    }

    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});