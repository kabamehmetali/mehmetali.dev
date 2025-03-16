const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Generic route handler (automatically serve HTML pages without extensions)
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(publicPath, `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next();
  });
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
