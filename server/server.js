const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
const publicPath = path.join(__dirname, '..', 'public/');
app.use(express.static(publicPath));

// Existing routes
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/about-me', (req, res) => {
  res.sendFile(path.join(publicPath, 'about-me.html'));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(publicPath, 'resume.html'));
});

app.get('/cover-letter', (req, res) => {
  res.sendFile(path.join(publicPath, 'cover-letter.html'));
});

app.get('/links', (req, res) => {
  res.sendFile(path.join(publicPath, 'links.html'));
});

app.get('/pages', (req, res) => {
  res.sendFile(path.join(publicPath, 'pages.html'));
});

app.get('/credentials', (req, res) => {
  res.sendFile(path.join(publicPath, 'credentials.html'));
});

// Blog listing page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(publicPath, 'blog.html'));
});

// Single blog post page
app.get('/blog-post', (req, res) => {
  res.sendFile(path.join(publicPath, 'blog-post.html'));
});

// NEW: Projects listing page
app.get('/projects', (req, res) => {
  res.sendFile(path.join(publicPath, 'projects.html'));
});

// NEW: Single project details page
app.get('/project-details', (req, res) => {
  res.sendFile(path.join(publicPath, 'project-details.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
