import { Cliente } from "./classes.js";
import { criarCliente, buscarClientes, removerCliente } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const btnCadastrar = document.getElementById("btnCadastrar");

  btnCadastrar.addEventListener("click", async () => {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const cliente = new Cliente(nome, email);
    await criarCliente(cliente);

    nomeInput.value = "";
    emailInput.value = "";

    await atualizarLista();
  });

  async function atualizarLista() {
    const clientes = await buscarClientes();
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = "";

    clientes.map(cliente => {
      const div = document.createElement("div");
      div.className = "cliente";
      div.innerHTML = `
        <strong>${cliente.nome}</strong> (${cliente.email})
        <button data-id="${cliente._id}">Excluir</button>
      `;
      lista.appendChild(div);
    });

    // Adiciona eventos de exclusão
    document.querySelectorAll(".cliente button").forEach(botao => {
      botao.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        await removerCliente(id);
        await atualizarLista();
      });
    });
  }

  atualizarLista();
});
