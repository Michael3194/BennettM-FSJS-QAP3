const express = require('express');
const app = express();
const PORT = 3000;

global.DEBUG = true; // Create a global flag to toggle for debugging

app.set('view engine', 'ejs'); // Set the view engine to use EJS
app.use(express.static('public')); // Set the static files directory
app.use(express.urlencoded({ extended: true })); // Allow the use of req.body

// Get for the home route
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Render a 404 page after all routes have been checked
app.use((req, res) => {
  res.status(404);
  res.render('404.ejs');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});
