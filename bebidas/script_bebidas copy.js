const baserowUrl = "https://api.baserow.io/api/database/rows/table/437308/?user_field_names=true";

const baserowToken = "9k7yhOTZwguQ1WJGdNK1NGXGDAcfJpxU";

async function fetchData() {
  try {
    const response = await fetch(baserowUrl, {
      headers: {
        "Authorization": `Token ${baserowToken}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    const records = data.results.filter(record => record.Ativos == true);

    const container = document.querySelector("section");
    container.innerHTML = "";

    records.forEach(record => {
      const cardOrg = document.createElement("div");
      cardOrg.classList.add("card_org");
      //<div class="card_org">
      cardOrg.innerHTML = `
                <h3 class="mobile">${record.Nomes}</h3>
                
                <div class="cardG">
                    <h3 class="desk">${record.Nomes}</h3>
                    
                    <div class="cards">

                        <div id="card_A" class="card_A">
                            <input type="checkbox" name="selecionar_A" id="check_A">
                            <img id="imagem_A" class="imgcard" src="${record.Imagens}" alt="Imagem de ${record.Nomes}">
                            <div class="cardValor">
                                <div class="p">
                                    <p class="notas">${record.Notas}</p>
                                    <p class="valores">R$ ${record.Valores}</p>
                                </div>
                                <div class="qty">
                                    <button><i class="material-icons">remove</i></button>
                                    <span>1</span>
                                    <button><i class="material-icons">add</i></button>
                                </div>
                            </div>
                        </div>

                        <div id="card_B" class="card_B">
                            <input type="checkbox" name="selecionar_B" id="check_B">
                            <img id="imagem_B" class="imgcard" src="${record.Imagens_2}" alt="Imagem de ${record.Nomes}">
                            <div class="cardValor">
                                <div class="p">
                                    <p class="notas">${record.Notas_2}</p>
                                    <p class="valores">R$ ${record.Valores_2}</p>
                                </div>
                                <div class="qty">
                                    <button><i class="material-icons">remove</i></button>
                                    <span>1</span>
                                    <button><i class="material-icons">add</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      container.appendChild(cardOrg);
    });
  } catch (error) {
    console.error("Erro ao buscar dados do Baserow:", error);
  }
}

fetchData();
