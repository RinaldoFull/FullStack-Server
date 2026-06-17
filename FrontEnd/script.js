// ===== CLIENTES =====
async function buscarEndereco(cep) {
  const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await resp.json();
  return data; // retorna logradouro, bairro, cidade, uf
}

async function listarMunicipios(uf) {
  const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  const data = await resp.json();
  return data.map(m => m.nome);
}

let clientes = [];
function adicionarCliente(nome, telefone, cep) {
  buscarEndereco(cep).then(endereco => {
    clientes.push({
      nome,
      telefone,
      endereco: `${endereco.logradouro}, ${endereco.localidade} - ${endereco.uf}`
    });
    atualizarTabela("clientes");
  });
}

// ===== USUÁRIOS =====
let usuarios = [];
function cadastrarUsuario(nome, email, senha) {
  usuarios.push({ nome, email, senha });
  atualizarTabela("usuarios");
}
function autenticarUsuario(email, senha) {
  return usuarios.find(u => u.email === email && u.senha === senha);
}

// ===== PRODUTOS =====
let produtos = [];
function adicionarProduto(nome, descricao, preco, categoria) {
  produtos.push({ nome, descricao, preco, categoria });
  atualizarTabela("produtos");
}

// ===== PEDIDOS =====
let pedidos = [];
function criarPedido(cliente, itens) {
  const valorTotal = itens.reduce((soma, item) => soma + item.preco, 0);
  pedidos.push({
    cliente,
    itens,
    status: "Em preparo",
    valorTotal,
    dataHora: new Date().toLocaleString()
  });
  atualizarTabela("pedidos");
}
function atualizarStatusPedido(id, novoStatus) {
  pedidos[id].status = novoStatus;
}

// ===== DADOS PARA TABELA =====
const dados = {
  clientes: { colunas: ["Nome","Telefone","Endereço"], linhas: [] },
  usuarios: { colunas: ["Nome","Email","Senha"], linhas: [] },
  produtos: { colunas: ["Nome","Descrição","Preço","Categoria"], linhas: [] },
  pedidos: { colunas: ["Cliente","Itens","Status","Valor Total","Data/Hora"], linhas: [] }
};

// ===== ATUALIZAR TABELA =====
function atualizarTabela(tipo) {
  const cabecalho = document.getElementById("cabecalho");
  const tbody = document.querySelector("#tabela tbody");

  cabecalho.innerHTML = "";
  dados[tipo].colunas.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    cabecalho.appendChild(th);
  });

  const thAcoes = document.createElement("th");
  thAcoes.textContent = "Ações";
  cabecalho.appendChild(thAcoes);

  tbody.innerHTML = "";
  let registros = [];
  if (tipo === "clientes") registros = clientes.map(c => [c.nome,c.telefone,c.endereco]);
  if (tipo === "usuarios") registros = usuarios.map(u => [u.nome,u.email,u.senha]);
  if (tipo === "produtos") registros = produtos.map(p => [p.nome,p.descricao,p.preco,p.categoria]);
  if (tipo === "pedidos") registros = pedidos.map(p => [p.cliente,p.itens.map(i=>i.nome).join(", "),p.status,p.valorTotal,p.dataHora]);

  dados[tipo].linhas = registros;

  registros.forEach((linha, index) => {
    const tr = document.createElement("tr");
    linha.forEach(cel => {
      const td = document.createElement("td");
      td.textContent = cel;
      tr.appendChild(td);
    });

    const tdAcoes = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarRegistro(tipo, index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => {
      if (tipo === "clientes") clientes.splice(index,1);
      if (tipo === "usuarios") usuarios.splice(index,1);
      if (tipo === "produtos") produtos.splice(index,1);
      if (tipo === "pedidos") pedidos.splice(index,1);
      atualizarTabela(tipo);
    };

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
}

// ===== EDITAR REGISTRO =====
function editarRegistro(tipo, index) {
  const registro = dados[tipo].linhas[index];
  document.getElementById("inputNome").value = registro[0];
  document.getElementById("inputCampo2").value = registro[1];
  document.getElementById("inputCampo3").value = registro[2];

  document.getElementById("btnSalvar").onclick = () => {
    if (tipo === "clientes") {
      clientes[index] = {
        nome: document.getElementById("inputNome").value,
        telefone: document.getElementById("inputCampo2").value,
        endereco: document.getElementById("inputCampo3").value
      };
    }
    if (tipo === "usuarios") {
      usuarios[index] = {
        nome: document.getElementById("inputNome").value,
        email: document.getElementById("inputCampo2").value,
        senha: document.getElementById("inputCampo3").value
      };
    }
    if (tipo === "produtos") {
      produtos[index] = {
        nome: document.getElementById("inputNome").value,
        descricao: document.getElementById("inputCampo2").value,
        preco: document.getElementById("inputCampo3").value,
        categoria: "Atualizado"
      };
    }
    atualizarTabela(tipo);
  };
}

// ===== INICIALIZA =====
document.getElementById("tipo").addEventListener("change", e => {
  atualizarTabela(e.target.value);
});
atualizarTabela("clientes");
