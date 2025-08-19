const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Chat page
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../chat.html'));
});

// Assistant static build
app.use('/assistant', express.static(
  path.join(__dirname, '../r3f-virtual-girlfriend-frontend/dist'),
  { index: 'index.html' }
));

// (Optional) SPA fallback for React Router
// app.get('/assistant/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../r3f-virtual-girlfriend-frontend/dist/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Shared backend running on http://localhost:${PORT}`);
});