const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Home + Chat
app.get('/', (_req,res)=>res.sendFile(path.join(__dirname,'../index.html')));
app.get('/chat', (_req,res)=>res.sendFile(path.join(__dirname,'../chatgpt-simulation.html')));

// Proxy /assistant/* to running Vite dev server (5173)
app.use('/assistant', createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true,
  pathRewrite: { '^/assistant': '' }
}));

app.listen(PORT, ()=>console.log('Dev backend w/ proxy on http://localhost:'+PORT));