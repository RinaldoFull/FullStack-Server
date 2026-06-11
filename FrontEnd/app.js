const API_BASE = "http://localhost:3000/api";

const entityConfig = {

  clientes: {
    label: "Clientes",

    fields: [
      {
        name: "nome",
        label: "Nome",
        type: "text",
        required: true
      },
      {
        name: "telefone",
        label: "Telefone",
        type: "text"
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "text"
      }
    ]
  },

  pizzas: {
    label: "Pizzas",

    fields: [
      {
        name: "nome",
        label: "Nome da Pizza",
        type: "text",
        required: true
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "text"
      },
      {
        name: "preco",
        label: "Preço",
        type: "number",
        required: true
      }
    ]
  },

  pedidos: {
    label: "Pedidos",

    fields: [
      {
        name: "cliente",
        label: "Cliente",
        type: "text",
        required: true
      },
      {
        name: "pizza",
        label: "Pizza",
        type: "text",
        required: true
      },
      {
        name: "status",
        label: "Status",
        type: "text"
      }
    ]
  },

  funcionarios: {
    label: "Funcionários",

    fields: [
      {
        name: "nome",
        label: "Nome",
        type: "text",
        required: true
      },
      {
        name: "cargo",
        label: "Cargo",
        type: "text"
      },
      {
        name: "telefone",
        label: "Telefone",
        type: "text"
      }
    ]
  }

};

let currentEntity = "clientes";

window.addEventListener("DOMContentLoaded", () => {
  renderTabs();
});

function renderTabs() {

  const tabs = document.getElementById("entity-tabs");

  tabs.innerHTML = "";

  Object.entries(entityConfig).forEach(([key, entity]) => {

    const button = document.createElement("button");

    button.textContent = entity.label;

    button.addEventListener("click", () => {
      currentEntity = key;

      renderForm();
    });

    tabs.appendChild(button);

  });

  renderForm();
}

function renderForm() {

  const entity = entityConfig[currentEntity];

  document.getElementById("form-title").textContent =
    `Novo ${entity.label}`;

  const fieldsContainer =
    document.getElementById("form-fields");

  fieldsContainer.innerHTML = "";

  entity.fields.forEach(field => {

    const label = document.createElement("label");

    label.innerHTML = `
      ${field.label}
      <input
        type="${field.type}"
        name="${field.name}"
        ${field.required ? "required" : ""}
      >
    `;

    fieldsContainer.appendChild(label);

  });

}