import json
from datetime import datetime
expenses = []



def saveExpenses():
    with open("expenses.json", "w") as file:
        json.dump(expenses, file)

def loadExpenses():
    global expenses
    try:
        with open("expenses.json", "r") as file:
            expenses = json.load(file)
    except:
        expenses = []






def addExpense():
    amount = float(input("Enter Amount: "))
    while True:
        try:
            amount = float(input("Enter Amount: "))
            break
        except:
            print("Invalid amount, Enter a Number!")


    category = input("Enter Category: ")

    while True:
        date_input = input("Enter Date (DD-MM-YYYY): ")
        try:
            date = datetime.strptime(date_input, "%d-%m-%Y").strftime("%d-%m-%Y")
            break

        except:
            print("Invalid date format! Please try again...")


    expense = {
        "amount": amount,
        "category": category,
        "date": date
    }

    expenses.append(expense)
    saveExpenses()

    print("Expense Added Successfully!")


def viewExpenses():
    if not expenses:
        print("No expenses found.")
        return
    
    print("\n---- Your Expenses ----")

    for exp in expenses:
        print(f"[₹{exp['amount']}] {exp['category']} {exp['date']}")
    

def showTotal():
    total = sum(exp['amount'] for exp in expenses)
    print(f"Total Spending: {total}")
    


def categorySummary():
    if not expenses:
        print("No Expenses Found!")
        return
    
    summary = {}

    for exp in expenses:
        cat = exp["category"]
        summary[cat] = summary.get(cat, 0) + exp["amount"]

    print("\n--- Category-wise Spending ---")
    for cat, amount in summary.items():
        print(f"{cat}: {amount}")


def filterByCategory():
    category = input("Enter category to filter: ")

    found = False

    for exp in expenses:
        if exp["category"].lower() == category:
            print(f"Amount: {exp['amount']} | Date: {exp['date']}")
            found = True

    if not found:
        print("No expenses found for this category.")


loadExpenses()
def main():

    while True:
        print("\n==== Expense Tracker ====")
        print("1. add Expense")
        print("2. View Expense")
        print("3. Show Total Expenses")
        print("4. Category Summary")
        print("5. Filter By Category")
        print("6. Exit")

        choice = input("Enter Your Choice: ")

        if choice == "1":
            addExpense()

        elif choice == "2":
            viewExpenses()

        elif choice == "3":
            showTotal()

        elif choice == "4":
            categorySummary()

        elif choice == "5":
            filterByCategory()

        elif choice == "6":
            print("Exiting...")
            break

        else:
            print("Invalid Choice")

main()