const API_URL = "https://crudcrud.com/api/477a6135e338499486e3824faa5f4c1b/clientes"


async function cadastrarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    });

    document.getElementById("nome").value = "",
        document.getElementById("email").value = "";

    listarClientes();
}

async function listarClientes() {
    const resposta = await fetch(API_URL);
    const clientes = await resposta.json();

    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = "";

    clientes.forEach(cliente => {
        const div = document.createElement("div");
        div.className = "cliente";
        div.innerHTML = `
                    <strong>${cliente.nome}</strong> (${cliente.email})
                    <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
                `;
        lista.appendChild(div);
    });
}

async function excluirCliente(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE"});
    listarClientes();
}
listarClientes();