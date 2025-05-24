const express = require('express')
const app = express()
const questionsApi = require('./routes/questions')
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));

questionsApi(app)

var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})