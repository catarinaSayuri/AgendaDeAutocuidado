const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const runSQLScript = async () => {
  const filePath = path.join(__dirname, '01-init-database.sql');

  if (!fs.existsSync(filePath)) {
    console.error('Arquivo SQL não encontrado:', filePath);
    process.exit(1);
  }

  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await pool.query(sql);
    console.log(' Script SQL executado com sucesso!');
  } catch (err) {
    console.error(' Erro ao executar o script SQL:\n', err.message);
  } finally {
    await pool.end();
  }
};

runSQLScript();
