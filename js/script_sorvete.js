function toggleSabores(tipo) {
    var saboresDiv = document.getElementById('sabores-' + tipo);
    saboresDiv.style.display = saboresDiv.style.display === 'none' ? 'block' : 'none';
}

function mostrarSabores(tipo) {
    var tamanhoSelect = document.getElementById(tipo + '-tamanho');
    var saboresDiv = document.getElementById('sabor-' + tipo);

    if (tamanhoSelect.value !== "") {
        saboresDiv.style.display = 'block';
    } else {
        saboresDiv.style.display = 'none';
    }
}

const BASE_URL_Tipos = "https://api.baserow.io/api/database/rows/table/406241/?user_field_names=true";
const BASE_URL = "https://api.baserow.io/api/database/rows/table/406242/?user_field_names=true";
const BASE_URL_esp = "https://api.baserow.io/api/database/rows/table/406243/?user_field_names=true";

const BASE_URL_cobert = "https://api.baserow.io/api/database/rows/table/436909/?user_field_names=true";
const BASE_URL_adic = "https://api.baserow.io/api/database/rows/table/436916/?user_field_names=true";
// Substitua ID_DA_TABELA pelo ID da tabela SorveteSabores
const API_TOKEN = "9k7yhOTZwguQ1WJGdNK1NGXGDAcfJpxU"; // Substitua pela sua chave de API Baserow


// Função para carregar os tipos de sorvete
async function carregarTiposSorvete() {
    try {
        const response = await fetch(BASE_URL_Tipos, {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

        const data = await response.json();

        // Filtra os tipos onde "Ativos" é true
        const tiposAtivos = data.results.filter(tipo => tipo.Ativos === true);

        const select = document.getElementById("sorvete-tamanho");

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
function mostrarEscolha() {
    const select = document.getElementById("sorvete-tamanho");
    const volume = document.getElementById("volume");
    const preco = document.getElementById("preco");
    const notas = document.getElementById("notas");
    const imagem = document.getElementById("imagem");

    const selectedOption = select.options[select.selectedIndex];

    if (selectedOption.value) {
        volume.textContent = selectedOption.value;
        preco.textContent = `R$ ${selectedOption.dataset.price}`;
        notas.textContent = selectedOption.dataset.notes || "Sem notas disponíveis.";
        imagem.src = selectedOption.dataset.image || "assets/copinho.png"; // Default image
    } else {
        volume.textContent = "Copinho";
        preco.textContent = "R$ 0,00";
        notas.textContent = "notas";
        imagem.src = "assets/copinho.png"; // Default image
    }
}

// Carrega os tipos de sorvete ao carregar a página
document.addEventListener("DOMContentLoaded", carregarTiposSorvete);



//Função para carregar os sabores
async function carregarSabores() {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

        const data = await response.json();

        // Filtra os sabores onde "Ativos" é true
        const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

        const saborLista = document.getElementById("Sabores_1");

        // Limpa qualquer conteúdo existente
        saborLista.innerHTML = "";

        // Adiciona os sabores dinamicamente
        saboresAtivos.forEach(sabor => {
            const label = document.createElement("label");
            label.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${sabor.Nomes}" class="sabor-checkbox"><span>${sabor.Nomes}</span>
            
                </div>   
                  <div class="qty">
                    <button class="decrement"><i class="material-icons">remove</i></button>
                    <span class="quantidade">1</span>
                    <button class="increment"><i class="material-icons">add</i></button>
                  </div>
                `;
            saborLista.appendChild(label);
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarSabores);


//Função para carregar os sabores especiais
async function carregarSaboresEsp() {
    try {
        const response = await fetch(BASE_URL_esp, {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

        const data = await response.json();

        // Filtra os sabores onde "Ativos" é true
        const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

        const saborLista = document.getElementById("Sabores_2");

        // Limpa qualquer conteúdo existente
        saborLista.innerHTML = "";

        // Adiciona os sabores dinamicamente
        saboresAtivos.forEach(sabor => {
            const label = document.createElement("label");
            label.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${sabor.Nomes}"><span>${sabor.Nomes}</span>
                
                </div>   
                    <div class="qty">
                    <button><i class="material-icons">remove</i></button>
                    <span>1</span>
                    <button><i class="material-icons">add</i></button>
                  </div>
                `;
            saborLista.appendChild(label);
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarSaboresEsp);


//Função para carregar as coberturas
async function carregarCoberturas() {
    try {
        const response = await fetch(BASE_URL_cobert, {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

        const data = await response.json();

        // Filtra os sabores onde "Ativos" é true
        const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

        const saborLista = document.getElementById("cobert");

        // Limpa qualquer conteúdo existente
        saborLista.innerHTML = "";

        // Adiciona os sabores dinamicamente
        saboresAtivos.forEach(sabor => {
            const label = document.createElement("label");
            label.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${sabor.Nomes}"><span>${sabor.Nomes}</span>
                `;
            saborLista.appendChild(label);
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}
// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarCoberturas);

//Função para carregar os adicionais
async function carregarAdicionais() {
    try {
        const response = await fetch(BASE_URL_adic, {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do Baserow");

        const data = await response.json();

        // Filtra os sabores onde "Ativos" é true
        const saboresAtivos = data.results.filter(sabor => sabor.Ativos === true);

        const saborLista = document.getElementById("adic");

        // Limpa qualquer conteúdo existente
        saborLista.innerHTML = "";

        // Adiciona os sabores dinamicamente
        saboresAtivos.forEach(sabor => {
            const label = document.createElement("label");
            label.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" value="${sabor.Nomes}"><span>${sabor.Nomes}</span>
                `;
            saborLista.appendChild(label);
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Carrega os sabores ao carregar a página
document.addEventListener("DOMContentLoaded", carregarAdicionais);



// Adiciona eventos para botões de quantidade
document.addEventListener('click', function (event) {
    if (event.target.closest('button')) {
        const button = event.target.closest('button');
        const qtyContainer = button.parentNode;
        const qtySpan = qtyContainer.querySelector('span');
        let qty = parseInt(qtySpan.innerText);

        if (button.innerText.trim() === 'add') {
            qty += 1;
        } else if (button.innerText.trim() === 'remove' && qty > 1) {
            qty -= 1;
        }

        qtySpan.innerText = qty;
    }
});

