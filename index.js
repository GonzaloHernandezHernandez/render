const express = require('express');
const path = require('path');
const app = express();
const questionsApi = require('./routes/questions');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
questionsApi(app);

// Servir frontend Angular compilado desde 'dist/pasaletras/browser'
const angularDistPath = path.join(__dirname, 'dist/pasaletras/browser');
app.use(express.static(angularDistPath));

// Redirigir cualquier otra ruta al index.html de Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});