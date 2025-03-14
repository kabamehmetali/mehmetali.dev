const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about-me', (req, res) => {
  res.render('about-me'); // Create this view similarly if needed
});

app.get('/resume', (req, res) => {
  res.render('resume'); // Create this view similarly if needed
});

app.get('/links', (req, res) => {
  res.render('links'); // Create this view similarly if needed
});

app.get('/pages', (req, res) => {
  res.render('pages'); // Create this view similarly if needed
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
