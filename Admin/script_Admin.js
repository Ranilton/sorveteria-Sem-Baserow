
const BASE_URL = "https://api.baserow.io/api/database/rows/table/406239/?user_field_names=true";
const API_TOKEN = "9k7yhOTZwguQ1WJGdNK1NGXGDAcfJpxU";

async function fetchBaserowData() {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    populateTable(data.results);
  } catch (error) {
    console.error("Erro ao carregar dados do Baserow:", error);
  }
}

function populateTable(rows) {
  const tbody = document.querySelector("#table1 tbody");
  tbody.innerHTML = ""; // Limpa o conteúdo existente

  rows.forEach(row => {
    console.log("Linha de dados:", row); // Depuração para verificar estrutura de cada linha
    const isChecked = row.Ativos ? 'checked' : '';
    const statusText = row.Ativos ? " Ativo" : " Não Ativo";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${row.Volumes || ''}"/></td>
      <td><input type="text" value="${row.Notas || ''}"/></td>
      <td><input type="text" value="${row.Valores || ''}"/></td>
      <td>
        <img class="imagens" src="${row.Imagens || 'https://via.placeholder.com/100'}" alt="Imagem"/>
        <input type="file" style="display:none;" onchange="previewFoto(event)" class="upload-input" />
      </td>
      <td>
        <input type="checkbox" ${isChecked} onchange="toggleStatus(this)"/>${statusText}
      </td>
    `;
    tbody.appendChild(tr);


    // Adiciona o evento de clique para a imagem
    const imgElement = tr.querySelector("img.imagens");
    const fileInput = tr.querySelector("input[type='file']");
    imgElement.style.cursor = 'pointer'; // Garante que o cursor mostre que é clicável
    imgElement.addEventListener("click", () => fileInput.click()); // Simula o clique no input de arquivo
  });
}

function toggleStatus(checkbox) {
  const status = checkbox.checked ? " Ativo" : " Não Ativo";
  checkbox.parentElement.innerHTML = `<input type="checkbox" ${checkbox.checked ? "checked" : ""} onchange="toggleStatus(this)"/>${status}`;
}

// Função para visualizar a imagem quando o usuário escolhe um arquivo
function previewFoto(event) {
  var reader = new FileReader();
  reader.onload = function () {
    // Aqui pegamos a célula da imagem associada e atualizamos a imagem
    const fileInput = event.target;
    const imgElement = fileInput.closest('td').querySelector('img.imagens'); // Encontra a imagem na célula da tabela
    imgElement.src = reader.result; // Define a imagem escolhida como fonte da imagem
  };
  reader.readAsDataURL(event.target.files[0]);
}


document.addEventListener("DOMContentLoaded", fetchBaserowData);
