# EMI Calculator for Travel Company

## Overview
This project is an EMI (Equated Monthly Installment) calculator designed for a travel company. It enables users to calculate EMI plans based on the booking date, check-in date, total amount, down payment, installment type (weekly, biweekly, or monthly), and the number of installments.

---

## Features
1. **EMI Completion Before Check-in**: All EMIs are scheduled to be completed at least 14 days before the check-in date.
2. **Check-in Validation**: If the check-in date is within 30 days from the booking date, EMI options are unavailable.
3. **Flexible Down Payment**: The first installment defaults to 25% of the total amount or can be customized by the user.
4. **Installment Frequency**: Users can choose between weekly, biweekly, or monthly installment options.
5. **Minimum Installment Amount**: If an installment amount is calculated to be less than $5, the installment count is adjusted to ensure each installment is at least $5.
6. **Frontend Integration**: The app provides a user-friendly form to input details and dynamically display EMI schedules in a table.

---

## Project Structure
```plaintext
travel-emi-calculator/
├── controllers/
│   └── emiController.js
├── routes/
│   └── emiRoutes.js
├── views/
│   └── index.html
├── app.js
├── package.json
└── README.md
```

### Key Files
- **app.js**: The main entry point for the Node.js application.
- **controllers/emiController.js**: Contains the logic to calculate EMI schedules.
- **routes/emiRoutes.js**: Defines API routes for EMI calculations.
- **views/index.html**: The frontend interface for users to interact with the EMI calculator.

---

## Installation and Setup

### Prerequisites
1. [Node.js](https://nodejs.org/) (version 16 or higher)
2. [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps
1. Unzip Travel-emi-calculator
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. Open the application in your browser at:
   ```
   http://localhost:3001
   ```
 ### OR 
 Install dependencies:
 npm init -y
 npm install express body-parser cors nodemon
 
---

## API Endpoints

### **POST /api/emi/calculate**
Calculates the EMI schedule based on user input.

#### Request Body
```json
{
  "booking_date": "YYYY-MM-DD",
  "checkin_date": "YYYY-MM-DD",
  "amount": 100,
  "down_payment": 25,
  "instalment_type": "weekly",
  "no_of_emi": 5
}
```

#### Response
- **Success (200)**
```json
{
  "emi_available": true,
  "data": [
    { "emi_date": "YYYY-MM-DD", "amount": 15 },
    { "emi_date": "YYYY-MM-DD", "amount": 15 }
  ]
}
```

- **Error (400)**
```json
{
  "emi_available": false,
  "message": "EMI is not available as the check-in date is within 30 days."
}
```

---

## Frontend Usage
1. Open `views/index.html` in your browser.
2. Fill in the form fields:
   - Booking Date
   - Check-in Date
   - Total Amount
   - Down Payment (optional)
   - Installment Type
3. Click the "Calculate" button.
4. View the EMI schedule displayed dynamically below the form.

---

## Testing

### Using Postman
1. Import the API endpoint into Postman:
   - URL: `http://localhost:3001/api/emi/calculate`
   - Method: `POST`
2. Set the request body to:
   ```json
   {
     "booking_date": "2022-01-01",
     "checkin_date": "2022-03-01",
     "amount": 100,
     "down_payment": 25,
     "instalment_type": "weekly",
     "no_of_emi": 5
   }
   ```
3. Click "Send" and verify the response.

### Using Browser
1. Start the server (`node app.js`).
2. Open `http://localhost:3001` in your browser.
3. Fill out the form and verify the displayed results.

---

## Test Cases

### Case 1: EMI Completion Before Check-in
- **Input**: Check-in date is 2 months after booking.
- **Expected Output**: Last EMI is 14 days before check-in.

### Case 2: Check-in Date Within 30 Days
- **Input**: Check-in is 15 days after booking.
- **Expected Output**: EMI unavailable.

### Case 3: Default Down Payment
- **Input**: No down payment provided.
- **Expected Output**: First EMI is 25% of total amount.

### Case 4: Minimum Installment Amount
- **Input**: Total amount is $20.
- **Expected Output**: EMI count adjusts to ensure a minimum of $5 per installment.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, JavaScript
- **Testing**: Postman



