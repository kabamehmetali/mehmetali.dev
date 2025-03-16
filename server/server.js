const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Absolute path to the 'public' folder
const publicPath = path.resolve(__dirname, '../public');

// Serve static assets directly from 'public'
app.use(express.static(publicPath));

// Explicit routes to serve HTML pages
const pages = [
  'index',
  'home',
  'about-me',
  'resume',
  'cover-letter',
  'links',
  'pages',
  'credentials',
  'blog',
  'blog-post',
  'projects',
  'project-details'
];

pages.forEach(page => {
  app.get(`/${page === 'index' ? '' : page}`, (req, res) => {
    res.sendFile(path.join(publicPath, `${page}.html`));
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
