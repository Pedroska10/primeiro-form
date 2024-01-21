const pool = require("../bancodedados");

const cadastrarUsuario = async (req, res) => {
  const {
    nome,
    cpf,
    data_nascimento,
    email,
    telefone,
    endereco,
    cidade,
    estado,
  } = req.body;
  try {
    const query = `INSERT INTO usuarios
     (nome, cpf, data_nascimento, email, telefone, endereco, cidade, estado) 
     VALUES 
     ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const params = [
      nome,
      cpf,
      data_nascimento,
      email,
      telefone,
      endereco,
      cidade,
      estado,
    ];
    const novoUsuario = await pool.query(query, params);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { cadastrarUsuario };
