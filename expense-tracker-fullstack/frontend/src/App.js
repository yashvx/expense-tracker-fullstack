import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch expenses from backend
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  // Add expense
  const addExpense = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount, category, date })
    });

    // Refresh list
    const res = await fetch("http://localhost:5000/expenses");
    const data = await res.json();
    setExpenses(data);

    // Clear inputs
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = async (id) => {
  await fetch(`http://localhost:5000/expenses/${id}`, {
    method: "DELETE"
  });

  const res = await fetch("http://localhost:5000/expenses");
  const data = await res.json();
  setExpenses(data);
};
  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/expenses");
  const data = await res.json();
  setExpenses(data);
  };

  


  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  

  const filteredExpenses = expenses.filter(exp =>
  filter ? exp.category === filter : true
);

  return (
  <div className={darkMode ? "dark" : "light"}>
    <div className="container">

      <button style={{ marginBottom: "15px" }} onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <h1>💰 Expense Tracker</h1>

      <form onSubmit={addExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>

      <h2>Total: ₹{total}</h2>

      <div>
        {expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          expenses.map((exp) => (
            <div key={exp._id} className="card">
              <div>
                ₹{exp.amount} - {exp.category}
                <br />
                <small>{exp.date}</small>
              </div>

              <button onClick={() => deleteExpense(exp._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  </div>
)};

export default App;
