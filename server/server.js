const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'public');

// Explicitly serve static assets (CSS, JS, Images)
app.use('/css', express.static(path.join(publicPath, 'css')));
app.use('/js', express.static(path.join(publicPath, 'js')));
app.use('/images', express.static(path.join(publicPath, 'images')));

// Serve partial HTML files explicitly
app.get('/navigation.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'navigation.html'));
});

app.get('/footer.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'footer.html'));
});

// Explicit routes for HTML pages
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const pages = [
  'blog', 'blog-post', 'about-me', 'resume', 'cover-letter', 
  'links', 'pages', 'credentials', 'projects', 'project-details'
];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(publicPath, `${page}.html`));
  });
});

// Handle 404 errors explicitly
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
