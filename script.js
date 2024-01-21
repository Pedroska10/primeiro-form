const elementoCidade = document.querySelector("#cidade");
const elementoEstado = document.querySelector("#estado");
const elementoBotao = document.querySelector("#botao");

function enviarCorpoDaRequisicao() {
  const nome = document.querySelector("#nome").value;
  const cpf = document.querySelector("#cpf").value;
  const dataNascimento = document.querySelector("#dataNascimento").value;
  const email = document.querySelector("#email").value;
  const telefone = document.querySelector("#telefone").value;
  const endereco = document.querySelector("#endereco").value;
  const cidade = document.querySelector("#cidade").value;
  const estado = document.querySelector("#estado").value;

  const corpoDaRequisicao = {
    data_nascimento: dataNascimento,
    nome,
    cpf,
    email,
    telefone,
    endereco,
    cidade,
    estado,
  };
  return corpoDaRequisicao;
}

window.addEventListener("load", async () => {
  const requestEstados = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );
  const responseEstados = await requestEstados.json();

  responseEstados.forEach((uf) => {
    const option = document.createElement("option");
    option.value = uf.sigla;
    option.text = uf.sigla;
    elementoEstado.appendChild(option);
  });
});

elementoEstado.addEventListener("change", async () => {
  const requestCidades = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${elementoEstado.value}/municipios`
  );
  const responseCidades = await requestCidades.json();
  let optionsCidades = "";
  responseCidades.forEach((cidade) => {
    optionsCidades += `<option> ${cidade.nome} </option>`;
  });
  let options =
    '<option value="" disabled selected>Selecione uma cidade</option>';
  options += optionsCidades;
  elementoCidade.innerHTML = options;
});

elementoBotao.addEventListener("click", async () => {
  const requestConfiguracao = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enviarCorpoDaRequisicao()),
  };

  const urlCadastro = "http://localhost:3000/usuarios";
  const requestCadastroUsuario = await fetch(urlCadastro, requestConfiguracao);
});
