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

// Servir frontend Angular compilado
app.use(express.static(path.join(__dirname, 'dist/tu-app')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/pasaletras/browser/index.html'));
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
