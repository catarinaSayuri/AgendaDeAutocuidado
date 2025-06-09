const isAuthenticated = (req, res, next) => {
  console.log('Sessão no middleware:', req.session.user); // Log para depuração
  if (!req.session.user || !req.session.user.id_usuario || isNaN(parseInt(req.session.user.id_usuario))) {
    return res.status(401).json({ error: 'Não autorizado: ID de usuário inválido' });
  }
  next();
};

module.exports = { isAuthenticated };