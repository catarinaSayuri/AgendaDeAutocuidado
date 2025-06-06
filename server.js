require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db');
const path = require('path');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use secure: true em produção com HTTPS
}));

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// Conexão com o banco de dados
db.connect()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL');
        const allRoutes = require('./routes/index');
        app.use('/', allRoutes);

        app.use((req, res, next) => {
            res.status(404).send('Página não encontrada');
        });

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Erro no servidor');
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });