const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files directly from public folder
app.use(express.static(path.resolve(__dirname, '../public')));

// Redirect root and friendly URLs explicitly to HTML files
app.get(['/', '/home'], (req, res) => {
  res.redirect('/index.html');
});

app.get('/blog', (req, res) => {
  res.redirect('/blog.html');
});

app.get('/about-me', (req, res) => {
  res.redirect('/about-me.html');
});

app.get('/resume', (req, res) => {
  res.redirect('/resume.html');
});

app.get('/cover-letter', (req, res) => {
  res.redirect('/cover-letter.html');
});

app.get('/links', (req, res) => {
  res.redirect('/links.html');
});

app.get('/pages', (req, res) => {
  res.redirect('/pages.html');
});

app.get('/credentials', (req, res) => {
  res.redirect('/credentials.html');
});

app.get('/blog-post', (req, res) => {
  res.redirect('/blog-post.html');
});

app.get('/projects', (req, res) => {
  res.redirect('/projects.html');
});

app.get('/project-details', (req, res) => {
  res.redirect('/project-details.html');
});

// Proper 404 handling
app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
