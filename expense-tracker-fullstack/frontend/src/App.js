import React, { useState, useEffect } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

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

  const deleteExpense = async (index) => {
  await fetch(`http://localhost:5000/expenses/${index}`, {
    method: "DELETE"
  });

  const res = await fetch("http://localhost:5000/expenses");
  const data = await res.json();
  setExpenses(data);
};

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
  <div style={{
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial"
  }}>
    <h1>💰 Expense Tracker</h1>

    <form onSubmit={addExpense} style={{ marginBottom: "20px" }}>
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

      <button type="submit">Add</button>
    </form>

    <h2>Total: ₹{total}</h2>

    <h2>Expenses</h2>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {expenses.map((exp, index) => (
        <li key={index} style={{
          background: "#f4f4f4",
          margin: "10px",
          padding: "10px",
          borderRadius: "8px"
        }}>
          ₹{exp.amount} - {exp.category} ({exp.date})

          <br  />

          <button onClick={() => deleteExpense(index)}>Delete</button>
          
        </li>
      ))}
    </ul>
  </div>
  )}

export default App;