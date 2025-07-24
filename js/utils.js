const API_URL = "https://crudcrud.com/api/477a6135e338499486e3824faa5f4c1b/clientes";

export async function criarCliente(cliente) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  return response.ok;
}

export async function buscarClientes() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function removerCliente(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  return response.ok;
}
