const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const rota = require("./rotas");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));
app.use(rota);

app.listen(3000);
