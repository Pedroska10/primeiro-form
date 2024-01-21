const express = require("express");
const rota = express();

const { cadastrarUsuario } = require("./controladores/usuarios");

rota.post("/usuarios", cadastrarUsuario);

module.exports = rota;
