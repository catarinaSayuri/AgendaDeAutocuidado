require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.connect()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL');

        app.use(express.json());

        // Rotas para endereços (API)
        const agendamentoRoutes = require('./routes/agendamentoRoutes');
        app.use('/agendamento', agendamentoRoutes);

        // Rotas para servicos (API)
        const atividadeRoutes = require('./routes/atividadeRoutes');
        app.use('/atividade', atividadeRoutes);

        const usuarioRoutes = require('./routes/usuarioRoutes');
        app.use('/usuario', usuarioRoutes);

        // Middleware para lidar com erros de rota não encontrada
        app.use((req, res, next) => {
            res.status(404).send('Página não encontrada');
        });

        // Middleware para lidar com erros internos do servidor
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
