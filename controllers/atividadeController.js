const atividadeModel = require('../models/atividadeModel');

// Criar uma nova atividade
const criarAtividade = async (req, res) => {
    try {
        const { nome, categoria, descricao, cor_categoria } = req.body;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ error: 'O nome da atividade não pode estar vazio.' });
        }
        if (!categoria || categoria.trim() === '') {
            return res.status(400).json({ error: 'A categoria não pode estar vazia.' });
        }
        if (!cor_categoria || !/^#[0-9A-F]{6}$/i.test(cor_categoria)) {
            return res.status(400).json({ error: 'Cor inválida. Use o formato hexadecimal (#RRGGBB).' });
        }

        const novaAtividade = await atividadeModel.criarAtividade(nome.trim(), categoria.trim(), descricao ? descricao.trim() : null, cor_categoria, id_usuario);
        res.status(201).json(novaAtividade);
    } catch (error) {
        console.error('Erro ao criar atividade:', error);
        res.status(500).json({ error: 'Erro ao criar atividade: ' + error.message });
    }
};

// Buscar todas as atividades de um usuário
const buscarAtividadesPorUsuario = async (req, res) => {
    try {
        const id_usuario = req.session.user.id_usuario;
        const { is_favorite } = req.query;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        let atividades;
        if (is_favorite === 'true') {
            atividades = await atividadeModel.buscarAtividadesFavoritasPorUsuario(id_usuario);
        } else {
            atividades = await atividadeModel.buscarTodasAtividadesPorUsuario(id_usuario);
        }

        res.status(200).json(atividades);
    } catch (error) {
        console.error('Erro ao buscar atividades do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar atividades do usuário: ' + error.message });
    }
};

// Buscar atividades por categoria
const buscarAtividadesPorCategoria = async (req, res) => {
    try {
        const { nome_categoria } = req.query;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!nome_categoria || nome_categoria.trim() === '') {
            return res.status(400).json({ error: 'Nome da categoria é obrigatório e não pode estar vazio.' });
        }

        const atividades = await atividadeModel.buscarAtividadesPorCategoria(id_usuario, nome_categoria.trim());
        res.status(200).json(atividades);
    } catch (error) {
        console.error('Erro ao buscar atividades por categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar atividades por categoria: ' + error.message });
    }
};

// Buscar categorias únicas
const buscarCategoriasUnicasAtividades = async (req, res) => {
    try {
        const id_usuario = req.session.user.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        const categorias = await atividadeModel.buscarCategoriasUnicasAtividades(id_usuario);
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao buscar categorias únicas de atividades:', error);
        res.status(500).json({ error: 'Erro ao buscar categorias únicas de atividades: ' + error.message });
    }
};

// Buscar uma atividade por ID
const buscarAtividadePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID de atividade inválido.' });
        }

        const atividade = await atividadeModel.buscarAtividadePorId(id, id_usuario);
        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
        }
        res.status(200).json(atividade);
    } catch (error) {
        console.error('Erro ao buscar atividade por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar atividade por ID: ' + error.message });
    }
};

// Atualizar uma atividade
const atualizarAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, categoria, descricao, cor_categoria, is_favorite } = req.body;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID de atividade inválido.' });
        }
        if (nome && nome.trim() === '') {
            return res.status(400).json({ error: 'O nome da atividade não pode estar vazio.' });
        }
        if (categoria && categoria.trim() === '') {
            return res.status(400).json({ error: 'A categoria não pode estar vazia.' });
        }
        if (cor_categoria && !/^#[0-9A-F]{6}$/i.test(cor_categoria)) {
            return res.status(400).json({ error: 'Cor inválida. Use o formato hexadecimal (#RRGGBB).' });
        }

        const atividadeAtualizada = await atividadeModel.atualizarAtividade(id, id_usuario, {
            nome: nome ? nome.trim() : undefined,
            categoria: categoria ? categoria.trim() : undefined,
            descricao: descricao ? descricao.trim() : undefined,
            cor_categoria,
            is_favorite
        });
        if (!atividadeAtualizada) {
            return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
        }
        res.status(200).json(atividadeAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar atividade:', error);
        res.status(500).json({ error: 'Erro ao atualizar atividade: ' + error.message });
    }
};

// Deletar uma atividade
const deletarAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID de atividade inválido.' });
        }

        const sucesso = await atividadeModel.deletarAtividade(id, id_usuario);
        if (!sucesso) {
            return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar atividade:', error);
        res.status(500).json({ error: 'Erro ao deletar atividade: ' + error.message });
    }
};

// Atualizar o status de favorito
const atualizarFavorito = async (req, res) => {
    try {
        const { id_atividade, is_favorite } = req.body;
        const id_usuario = req.session.user.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!id_atividade || isNaN(parseInt(id_atividade))) {
            return res.status(400).json({ error: 'ID de atividade inválido.' });
        }

        const sucesso = await atividadeModel.atualizarFavorito(id_usuario, id_atividade, is_favorite);
        if (!sucesso) {
            return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
        }
        res.status(200).json({ message: 'Status de favorito atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
        res.status(500).json({ error: 'Erro ao atualizar favorito: ' + error.message });
    }
};

module.exports = {
    criarAtividade,
    buscarAtividadesPorUsuario,
    buscarAtividadesPorCategoria,
    buscarCategoriasUnicasAtividades,
    buscarAtividadePorId,
    atualizarAtividade,
    deletarAtividade,
    atualizarFavorito,
};