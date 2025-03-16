const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Adjust this path based on your production directory structure
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);

app.use(express.static(publicPath));

const sendHtml = (filename) => (req, res) => {
  res.sendFile(path.join(publicPath, filename));
};

app.get('/', sendHtml('index.html'));
app.get('/home', sendHtml('index.html'));
app.get('/about-me', sendHtml('about-me.html'));
app.get('/credentials', sendHtml('credentials.html'));
app.get('/links', sendHtml('links.html'));
app.get('/pages', sendHtml('pages.html'));
app.get('/blog', sendHtml('blog.html'));
app.get('/blog-post', sendHtml('blog-post.html'));
app.get('/projects', sendHtml('projects.html'));
app.get('/project-details', sendHtml('project-details.html'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
