const MongoLib = require('./lib/mongo');
const path = require('path');
const app = express();
const questionsApi = require('./routes/questions');

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    const db = await new MongoLib().connect();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Rutas
    questionsApi(app, db); // <-- pásale la conexión si la necesitas

    // Servir Angular
    const angularDistPath = path.join(__dirname, 'dist/pasaletras/browser');
    app.use(express.static(angularDistPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(angularDistPath, 'index.html'));
    });

    // Escuchar
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en ${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar la app:', err.message);
  }
})();
