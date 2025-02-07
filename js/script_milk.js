

const BASE_URL = "https://api.baserow.io/api/database/rows/table/406239/?user_field_names=true";
const BASE_URL_Sabores = "https://api.baserow.io/api/database/rows/table/406240/?user_field_names=true";
const BASE_URL_Coberturas = "https://api.baserow.io/api/database/rows/table/436892/?user_field_names=true";
const API_TOKEN = "9k7yhOTZwguQ1WJGdNK1NGXGDAcfJpxU";

// Função para carregar os tipos de Milkshakes
async function carregarTiposMilk() {
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

    const select = document.getElementById("milk-tamanho");

    // Adiciona os tipos dinamicamente ao <select>
    tiposAtivos.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo.Volumes;
      option.dataset.price = tipo.Valores;
      option.dataset.notes = tipo.Notas;
      option.dataset.image = tipo.Imagens;
      option.dataset.tipo = tipo.Tipo;
      option.textContent = `${tipo.Volumes}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}


// Função para mostrar os detalhes do tipo selecionado
function mostrarMilks() {
  const select = document.getElementById("milk-tamanho");
  const volume = document.getElementById("milk-volume");
  const preco = document.getElementById("milk-preco");
  const notas = document.getElementById("milk-notas");
  const imagem = document.getElementById("milk-imagem");
  const saborLista = document.getElementById("Sabores");
  const coberturasLista = document.getElementById("Coberturas");

  const selectedOption = select.options[select.selectedIndex];

  if (selectedOption.value) {
    volume.textContent = selectedOption.value;
    preco.textContent = `R$ ${selectedOption.dataset.price}`;
    notas.textContent = selectedOption.dataset.notes || "Sem notas disponíveis.";
    imagem.src = selectedOption.dataset.image || "assets/milkshake.png"; // Default image

    // Verifica se o nome tem "Especial" e carrega os sabores filtrados
    const isEspecial = selectedOption.textContent.includes("Especial");
    carregarSabores(isEspecial);
    carregarCoberturas(isEspecial);

  } else {
    volume.textContent = "Milkshake";
    preco.textContent = "R$ 0,00";
    notas.textContent = "notas";
    imagem.src = "assets/milkshake.png"; // Default image

    // Limpa a lista e esconde o container
    saborLista.innerHTML = "";
    coberturasLista.innerHTML = "";
    saborLista.style.display = "none";
    coberturasLista.style.display = "none";
  }
}
// Carrega os tipos de sorvete ao carregar a página
document.addEventListener("DOMContentLoaded", carregarTiposMilk);


// Função para carregar os sabores de milkshakes
async function carregarSabores(especial) {

  // Carrega os sabores
  const saborLista = document.getElementById("Sabores");
  // Oculta a lista inicialmente
  saborLista.style.display = "none";

  try {
    const response = await fetch(BASE_URL_Sabores, {
      headers: { Authorization: `Token ${API_TOKEN}` }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();

    // Filtra os sabores onde "Ativos" é true e verifica se é 'Especial'
    const saboresAtivos = data.results.filter(sabor => {
      if (especial) {
        // mostrar apenas sabores com "Especial" no tipo
        return sabor.Ativos === true && sabor.Tipo && sabor.Tipo.includes("Especial");
      } else {
        //mostrar apena sabore que não têm "Especial" no tipo
        return sabor.Ativos === true && (!sabor.Tipo || !sabor.Tipo.includes("Especial"));
      }
    });

    saborLista.innerHTML = ""; // Limpa qualquer conteúdo existente

    if (saboresAtivos.length > 0) {
      // Adiciona os sabores dinamicamente
      saboresAtivos.forEach(sabor => {
        const label = document.createElement("label");
        label.innerHTML = `
        <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${sabor.Nomes}">${sabor.Nomes}
      `;
        saborLista.appendChild(label);
      });

      // Mostra a lista de sabores após preenchimento
      saborLista.style.display = "block";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}


// Função para carregar os coberturas
async function carregarCoberturas(especial) {

  // Carrega os coberturas
  const coberturasLista = document.getElementById("Coberturas");
  // Oculta a lista inicialmente
  coberturasLista.style.display = "none";

  try {
    const response = await fetch(BASE_URL_Coberturas, {
      headers: { Authorization: `Token ${API_TOKEN}` }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

    const data = await response.json();


    // Filtra as coberturas onde "Ativos" é true e verifica se é 'Especial'
    const coberturasAtivos = data.results.filter(cobertura => {
      if (especial) {
        // Mostrar apenas coberturas com "Especial" no tipo
        const isEspecial = cobertura.Ativos === true && cobertura.Tipo && cobertura.Tipo.includes("Especial");

        return isEspecial;
      } else {
        // Mostrar apenas coberturas que não têm "Especial" no tipo
        const isNotEspecial = cobertura.Ativos === true && (!cobertura.Tipo || !cobertura.Tipo.includes("Especial"));

        return isNotEspecial;
      }
    });

    coberturasLista.innerHTML = ""; // Limpa qualquer conteúdo existente

    if (coberturasAtivos.length > 0) {
      // Adiciona as coberturas dinamicamente
      coberturasAtivos.forEach(cobertura => {
        const label = document.createElement("label");
        label.innerHTML = `
        <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${cobertura.Nomes}">${cobertura.Nomes}
      `;
        coberturasLista.appendChild(label);
      });

      // Mostra a lista de coberturas após preenchimento
      coberturasLista.style.display = "block";
    } else {

      coberturasLista.style.display = "none";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}
