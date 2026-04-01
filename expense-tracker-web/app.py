from flask import Flask, render_template, request, redirect
import json

app = Flask(__name__)

def load_expenses():
    try:
        with open("expenses.json", "r") as file:
            return json.load(file)
    except:
        return []

def save_expenses(expenses):
    with open("expenses.json", "w") as file:
        json.dump(expenses, file)

@app.route("/")
def home():
    expenses = load_expenses()
    total = sum(exp["amount"] for exp in expenses) 
    return render_template("index.html", expenses=expenses, total=total)

@app.route("/add", methods=["POST"])
def add():
    amount = float(request.form["amount"])
    category = request.form["category"].capitalize()
    date = request.form["date"]

    expenses = load_expenses()

    expenses.append({
        "amount": amount,
        "category": category,
        "date": date
    })

    save_expenses(expenses)

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/delete", methods=["POST"])
def delete():
    index = int(request.form["index"])

    expenses = load_expenses()

    if 0 <= index < len(expenses):
        expenses.pop(index)

    save_expenses(expenses)

    return redirect("/")