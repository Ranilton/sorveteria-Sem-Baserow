// function toggleSabores(tipo) {
//   var saboresDiv = document.getElementById('sabores-' + tipo);
//   saboresDiv.style.display = saboresDiv.style.display === 'none' ? 'block' : 'none';
// }

// function mostrarSabores(tipo) {
//   var tamanhoSelect = document.getElementById(tipo + '-tamanho');
//   var saboresDiv = document.getElementById('sabor-' + tipo);

//   if (tamanhoSelect.value !== "") {
//     saboresDiv.style.display = 'block';
//   } else {
//     saboresDiv.style.display = 'none';
//   }
// }

// 
function mostrarEscolha() {
  let select = document.getElementById("sorvete-tamanho");
  let imagem = document.getElementById("imagem");
  let notas = document.getElementById("notas");
  let volume = document.querySelector(".volume");
  let preco = document.querySelector(".preco");

  let selectedOption = select.options[select.selectedIndex];

  if (!selectedOption.value) {
    imagem.src = "/assets/copinho.png";
    notas.textContent = "0";
    volume.textContent = "Escolha um Sorvete";
    preco.textContent = "R$ 0,00";
    atualizarControles();
    return;
  }

  let tipo = selectedOption.value;
  let nota = selectedOption.getAttribute("nota") || "0";
  let precoValor = selectedOption.getAttribute("data-price") || "0";

  let imagens = {
    "Copinho Pequeno": "/imgs/copinho pequeno.jpeg",
    "Copinho Médio": "/imgs/copinho médio.jpeg",
    "Copinho Grande": "/imgs/copinho grande.jpeg",
    "Casquinha Pequeno": "/imgs/casquinha pequeno.jpeg",
    "Casquinha Médio": "/imgs/casquinha médio.jpg",
    "Cestinha -2 Sabores": "/imgs/cestinha 2 sabores.jpg",
    "Cestinha -3 Sabores": "/imgs/cestinha 3 sabores.jpeg"
  };

  imagem.src = imagens[tipo] || "/assets/copinho.png";
  volume.textContent = tipo;
  preco.textContent = "R$ " + parseFloat(precoValor).toFixed(2).replace(".", ",");

  notas.textContent = nota;
  atualizarControles();
}

function atualizarControles() {
  const notasElement = document.getElementById("notas");
  const checkboxes = document.querySelectorAll(".sabor-checkbox, #Sabores_2 input[type='checkbox']");
  const qtyContainers = document.querySelectorAll(".qty");
  const marcadoSpan = document.querySelector(".marcado");
  const precoSpan = document.querySelector(".preco");

  let notas = parseInt(notasElement.textContent) || 0;
  let totalSelecionado = 0;
  let selecionados = [];
  let precoTotal = parseFloat(precoSpan.textContent.replace("R$ ", "").replace(",", ".")) || 0;

  checkboxes.forEach((checkbox) => {
    const spanNome = checkbox.closest("label").querySelector("span");
    const qtySpan = checkbox.closest("label").querySelector(".quantidade") || checkbox.closest("label").querySelector(".qty span");
    let qty = qtySpan ? parseInt(qtySpan.textContent) : 0;

    if (checkbox.checked) {
      totalSelecionado += Math.max(qty, 1);
      selecionados.push(`${spanNome.textContent} (${qty})`);
      if (checkbox.closest("#Sabores_2")) {
        precoTotal += qty * 1.00;
      }
    }
  });

  marcadoSpan.textContent = selecionados.length > 0 ? selecionados.join(", ") : "Nenhum";
  precoSpan.textContent = "R$ " + precoTotal.toFixed(2).replace(".", ",");

  checkboxes.forEach((checkbox) => {
    checkbox.disabled = totalSelecionado >= notas && !checkbox.checked;
  });

  qtyContainers.forEach((qtyContainer) => {
    const checkbox = qtyContainer.closest("label")?.querySelector("input[type='checkbox']");
    const decrementButton = qtyContainer.querySelector("button:nth-child(1)");
    const incrementButton = qtyContainer.querySelector("button:nth-child(3)");
    const qtySpan = qtyContainer.querySelector("span");
    let qty = parseInt(qtySpan.textContent);

    if (checkbox?.checked) {
      incrementButton.disabled = totalSelecionado >= notas;
      decrementButton.disabled = qty <= 1;
    } else {
      incrementButton.disabled = true;
      decrementButton.disabled = true;
    }
  });
}

document.querySelectorAll(".sabor-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    atualizarControles();
  });
});

document.querySelectorAll(".qty button:nth-child(3)").forEach((button) => {
  button.addEventListener("click", function () {
    const qtySpan = this.closest(".qty").querySelector("span");
    qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    atualizarControles();
  });
});

document.querySelectorAll(".qty button:nth-child(1)").forEach((button) => {
  button.addEventListener("click", function () {
    const qtySpan = this.closest(".qty").querySelector("span");
    let qty = parseInt(qtySpan.textContent) || 1;
    if (qty > 1) {
      qtySpan.textContent = qty - 1;
      atualizarControles();
    }
  });
});

document.addEventListener("DOMContentLoaded", atualizarControles);
