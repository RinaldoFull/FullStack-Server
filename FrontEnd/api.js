import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export default api;

// api.js
const API_URL = "http://localhost:3000"; // ajuste para o backend real
const VIA_CEP_URL = "https://viacep.com.br/ws";
const IBGE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

// -------------------- CLIENTES --------------------
export async function getClientes() {
  const response = await fetch(`${API_URL}/clientes`);
  return response.json();
}

export async function createCliente(cliente) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return response.json();
}

export async function updateCliente(id, cliente) {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return response.json();
}

export async function deleteCliente(id) {
  const response = await fetch(`${API_URL}/clientes/${id}`, { method: "DELETE" });
  return response.json();
}

// Integração com ViaCEP
export async function getEnderecoByCEP(cep) {
  const response = await fetch(`${VIA_CEP_URL}/${cep}/json`);
  return response.json();
}

// Integração com IBGE
export async function getEstados() {
  const response = await fetch(`${IBGE_URL}/estados`);
  return response.json();
}

export async function getMunicipios(uf) {
  const response = await fetch(`${IBGE_URL}/estados/${uf}/municipios`);
  return response.json();
}

// -------------------- USUÁRIOS --------------------
export async function loginUsuario(credentials) {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function getUsuarios() {
  const response = await fetch(`${API_URL}/usuarios`);
  return response.json();
}

export async function createUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return response.json();
}

export async function updateUsuario(id, usuario) {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return response.json();
}

export async function deleteUsuario(id) {
  const response = await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
  return response.json();
}

// -------------------- PRODUTOS --------------------
export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);
  return response.json();
}

export async function createProduto(produto) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return response.json();
}

export async function updateProduto(id, produto) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return response.json();
}

export async function deleteProduto(id) {
  const response = await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
  return response.json();
}

// -------------------- PEDIDOS --------------------
export async function getPedidos() {
  const response = await fetch(`${API_URL}/pedidos`);
  return response.json();
}

export async function createPedido(pedido) {
  const response = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  return response.json();
}

export async function updatePedido(id, pedido) {
  const response = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  return response.json();
}

export async function deletePedido(id) {
  const response = await fetch(`${API_URL}/pedidos/${id}`, { method: "DELETE" });
  return response.json();
}

