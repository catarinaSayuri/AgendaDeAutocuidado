const db = require('../config/db');

const buscarAtividadePorId = async (id_atividade, id_usuario) => {
    try {
        console.log('Buscando atividade por ID:', { id_atividade, id_usuario });
        const result = await db.query('SELECT * FROM atividade WHERE id_atividade = $1 AND id_usuario = $2', [id_atividade, id_usuario]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro no model ao buscar atividade por ID:', error.message);
        throw new Error('Erro ao buscar atividade: ' + error.message);
    }
};

const buscarTodasAtividadesPorUsuario = async (id_usuario) => {
    try {
        console.log('Buscando todas atividades para id_usuario:', id_usuario);
        const result = await db.query('SELECT * FROM atividade WHERE id_usuario = $1', [id_usuario]);
        console.log('Atividades encontradas:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Erro no model ao buscar atividades do usuário:', error.message);
        throw new Error('Erro ao buscar atividades do usuário: ' + error.message);
    }
};

const buscarAtividadesFavoritasPorUsuario = async (id_usuario) => {
    try {
        console.log('Buscando atividades favoritas para id_usuario:', id_usuario);
        const result = await db.query('SELECT * FROM atividade WHERE id_usuario = $1 AND is_favorite = $2', [id_usuario, true]);
        return result.rows;
    } catch (error) {
        console.error('Erro no model ao buscar atividades favoritas:', error.message);
        throw new Error('Erro ao buscar atividades favoritas: ' + error.message);
    }
};

const buscarAtividadesPorCategoria = async (id_usuario, categoria) => {
    try {
        console.log('Buscando atividades por categoria:', { id_usuario, categoria });
        const result = await db.query('SELECT * FROM atividade WHERE id_usuario = $1 AND categoria = $2', [id_usuario, categoria]);
        return result.rows;
    } catch (error) {
        console.error('Erro no model ao buscar atividades por categoria:', error.message);
        throw new Error('Erro ao buscar atividades por categoria: ' + error.message);
    }
};

const buscarCategoriasUnicasAtividades = async (id_usuario) => {
    try {
        console.log('Buscando categorias únicas para id_usuario:', id_usuario);
        const result = await db.query(
            'SELECT DISTINCT categoria FROM atividade WHERE id_usuario = $1 AND categoria IS NOT NULL AND categoria != \'\' ORDER BY categoria',
            [id_usuario]
        );
        const categorias = result.rows.map(row => ({ categoria: row.categoria }));
        console.log('Categorias únicas encontradas:', categorias);
        return categorias;
    } catch (error) {
        console.error('Erro no model ao buscar categorias únicas de atividades:', error.message);
        throw new Error('Erro ao buscar categorias únicas de atividades: ' + error.message);
    }
};

const criarAtividade = async (nome, categoria, descricao, cor_categoria, id_usuario) => {
    try {
        console.log('Criando atividade:', { nome, categoria, descricao, cor_categoria, id_usuario });
        const result = await db.query(
            'INSERT INTO atividade (nome, categoria, descricao, cor_categoria, id_usuario, is_favorite) VALUES ($1, $2, $3, $4, $5, FALSE) RETURNING *',
            [nome, categoria, descricao, cor_categoria, id_usuario]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro no model ao criar atividade:', error.message);
        throw new Error('Erro ao criar atividade: ' + error.message);
    }
};

const atualizarAtividade = async (id_atividade, id_usuario, { nome, categoria, descricao, cor_categoria, is_favorite }) => {
    try {
        console.log('Atualizando atividade:', { id_atividade, id_usuario, nome, categoria, descricao, cor_categoria, is_favorite });
        const result = await db.query(
            'UPDATE atividade SET nome = COALESCE($1, nome), categoria = COALESCE($2, categoria), descricao = COALESCE($3, descricao), cor_categoria = COALESCE($4, cor_categoria), is_favorite = COALESCE($5, is_favorite) WHERE id_atividade = $6 AND id_usuario = $7 RETURNING *',
            [nome, categoria, descricao, cor_categoria, is_favorite, id_atividade, id_usuario]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro no model ao atualizar atividade:', error.message);
        throw new Error('Erro ao atualizar atividade: ' + error.message);
    }
};

const deletarAtividade = async (id_atividade, id_usuario) => {
    try {
        console.log('Deletando atividade:', { id_atividade, id_usuario });
        const result = await db.query('DELETE FROM atividade WHERE id_atividade = $1 AND id_usuario = $2 RETURNING *', [id_atividade, id_usuario]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro no model ao deletar atividade:', error.message);
        throw new Error('Erro ao deletar atividade: ' + error.message);
    }
};

const atualizarFavorito = async (id_usuario, id_atividade, is_favorite) => {
    try {
        console.log('Atualizando favorito:', { id_usuario, id_atividade, is_favorite });
        const result = await db.query(
            'UPDATE atividade SET is_favorite = $1 WHERE id_atividade = $2 AND id_usuario = $3 RETURNING *',
            [is_favorite, id_atividade, id_usuario]
        );
        if (result.rows.length === 0) {
            throw new Error('Atividade não encontrada ou não pertence ao usuário');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro no model ao atualizar favorito:', error.message);
        throw new Error('Erro ao atualizar favorito: ' + error.message);
    }
};

module.exports = {
    buscarAtividadePorId,
    buscarTodasAtividadesPorUsuario,
    buscarAtividadesFavoritasPorUsuario,
    buscarAtividadesPorCategoria,
    buscarCategoriasUnicasAtividades,
    criarAtividade,
    atualizarAtividade,
    deletarAtividade,
    atualizarFavorito
};