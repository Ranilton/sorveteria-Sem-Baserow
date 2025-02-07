

const BASE_URL = "https://api.baserow.io/api/database/rows/table/406244/?user_field_names=true";
const BASE_URL_Frutas = "https://api.baserow.io/api/database/rows/table/406248/?user_field_names=true";
const BASE_URL_caldas = "https://api.baserow.io/api/database/rows/table/406249/?user_field_names=true";
const BASE_URL_complem = "https://api.baserow.io/api/database/rows/table/406251/?user_field_names=true";
const BASE_URL_comple_prem = "https://api.baserow.io/api/database/rows/table/406253/?user_field_names=true";
const API_TOKEN = "9k7yhOTZwguQ1WJGdNK1NGXGDAcfJpxU";


// Função para carregar os tipos de açaí
async function carregarTiposAcai() {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os tipos onde "Ativos" é true
    const tiposAtivos = data.results.filter(tipo => tipo.Ativos === true);

    const select = document.getElementById("acai-tamanho");

    // Adiciona os tipos dinamicamente ao <select>
    tiposAtivos.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo.Volumes;
      option.dataset.price = tipo.Valores;
      option.dataset.notes = tipo.Notas;
      option.dataset.image = tipo.Imagens;
      option.textContent = `${tipo.Volumes}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}


// Função para mostrar os detalhes do tipo selecionado
function mostrarAcai() {
  const select = document.getElementById("acai-tamanho");
  const volume = document.getElementById("acai-volume");
  const preco = document.getElementById("acai-preco");
  const notas = document.getElementById("acai-notas");
  const imagem = document.getElementById("acai-imagem");

  const selectedOption = select.options[select.selectedIndex];

  if (selectedOption.value) {
    volume.textContent = selectedOption.value;
    preco.textContent = `R$ ${selectedOption.dataset.price}`;
    notas.textContent = selectedOption.dataset.notes || "Sem notas disponíveis.";
    imagem.src = selectedOption.dataset.image || "assets/acaí.png"; // Default image
  } else {
    volume.textContent = "Açaí";
    preco.textContent = "R$ 0,00";
    notas.textContent = "notas";
    imagem.src = "assets/acaí.png"; // Default image
  }
}

// Carrega os tipos de sorvete ao carregar a página
document.addEventListener("DOMContentLoaded", carregarTiposAcai);


//Função para carregar as frutas
async function carregarFrutas() {
  try {
    const response = await fetch(BASE_URL_Frutas, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os sabores onde "Ativos" é true
    const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

    const saborLista = document.getElementById("frutas");

    // Limpa qualquer conteúdo existente
    saborLista.innerHTML = "";

    // Adiciona os sabores dinamicamente
    saboresAtivos.forEach(sabor => {
      const label = document.createElement("label");
      label.innerHTML = `
                  <input class="chec" type="checkbox" value="${sabor.Nomes}">${sabor.Nomes}
              `;
      saborLista.appendChild(label);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarFrutas);


//Função para carregar os coberturas/caldas
async function carregarCaldas() {
  try {
    const response = await fetch(BASE_URL_caldas, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os sabores onde "Ativos" é true
    const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

    const saborLista = document.getElementById("caldas");

    // Limpa qualquer conteúdo existente
    saborLista.innerHTML = "";

    // Adiciona os sabores dinamicamente
    saboresAtivos.forEach(sabor => {
      const label = document.createElement("label");
      label.innerHTML = `
                  <input type="checkbox" value="${sabor.Nomes}">${sabor.Nomes}
              `;
      saborLista.appendChild(label);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarCaldas);


//Função para carregar os complementos
async function carregarComplem() {
  try {
    const response = await fetch(BASE_URL_complem, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os sabores onde "Ativos" é true
    const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

    const saborLista = document.getElementById("complementos");

    // Limpa qualquer conteúdo existente
    saborLista.innerHTML = "";

    // Adiciona os sabores dinamicamente
    saboresAtivos.forEach(sabor => {
      const label = document.createElement("label");
      label.innerHTML = `
                  <input type="checkbox" value="${sabor.Nomes}">${sabor.Nomes}
              `;
      saborLista.appendChild(label);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarComplem);


//Função para carregar os complementos premium
async function carregarComplePrem() {
  try {
    const response = await fetch(BASE_URL_comple_prem, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os sabores onde "Ativos" é true
    const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

    const saborLista = document.getElementById("complementos_premium");

    // Limpa qualquer conteúdo existente
    saborLista.innerHTML = "";

    // Adiciona os sabores dinamicamente
    saboresAtivos.forEach(sabor => {
      const label = document.createElement("label");
      label.innerHTML = `
                  <input type="checkbox" value="${sabor.Nomes}">${sabor.Nomes}
              `;
      saborLista.appendChild(label);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarComplePrem);
