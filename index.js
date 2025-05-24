const express = require('express')
const path = require('path'); 
const app = express()

const questionsApi = require('./routes/questions')
const PORT = 8080

 // 🟢 Servir archivos Angular compilados
app.use(express.static(path.join(__dirname, 'dist/tu-app')));

// 🟢 Redirigir todas las rutas Angular al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tu-app/index.html'));
});

// 🔵 Tus rutas de API aquí (por ejemplo):
const questionsRouter = require('./routes/questions');
app.use('/api/questions', questionsRouter);

// Puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

questionsApi(app)

var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})