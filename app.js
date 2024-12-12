const express = require('express');
const path = require('path');
const emiRoutes = require('./routes/emiRoutes'); // Import routes

const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());
// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Route to serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/emi', emiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
