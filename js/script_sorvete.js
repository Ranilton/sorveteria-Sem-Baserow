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

function mostrarEscolha() {
  let select = document.getElementById("sorvete-tamanho");
  let imagem = document.getElementById("imagem");
  let notas = document.getElementById("notas");
  let volume = document.querySelector(".volume");
  let preco = document.querySelector(".marcadopreco");

  let selectedOption = select.options[select.selectedIndex];

  // Se "Selecione" estiver ativo, limpa os campos
  if (!selectedOption.value) {
    imagem.src = "/assets/copinho.png"; // Define uma imagem padrão
    notas.textContent = "";
    volume.textContent = "Escolha um Sorvete";
    preco.textContent = "R$ 0,00";
    return;
  }

  let tipo = selectedOption.value;
  let nota = selectedOption.getAttribute("nota"); // Obtém o valor do atributo nota
  let precoValor = selectedOption.getAttribute("data-price"); // Obtém o preço

  // Atualiza a imagem do sorvete de acordo com o tipo
  if (tipo === "Copinho Pequeno") {
    imagem.src = "/imgs/copinho pequeno.jpeg";
  } else if (tipo === "Copinho Médio") {
    imagem.src = "/imgs/copinho médio.jpeg";
  } else if (tipo === "Copinho Grande") {
    imagem.src = "/imgs/copinho grande.jpeg";
  }
  else if (tipo === "Casquinha Pequeno") {
    imagem.src = "/imgs/casquinha pequeno.jpeg";
  } else if (tipo === "casquinha Médio") {
    imagem.src = "/imgs/casquinha médio.jpg";
  }
  else if (tipo === "Cestinha -2 Sabores") {
    imagem.src = "/imgs/cestinha 2 sabores.jpg";
  } else if (tipo === "Cestinha -3 Sabores") {
    imagem.src = "/imgs/cestinha 3 sabores.jpeg";
  }

  // Atualiza os textos na página
  volume.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  preco.textContent = "R$ " + parseFloat(precoValor).toFixed(2);
  notas.textContent = nota ? "Nota: " + nota : "";
}


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





document.addEventListener("DOMContentLoaded", function () {
  const notasElement = document.getElementById("notas");
  const checkboxes = document.querySelectorAll(".sabor-checkbox, #Sabores_2 input[type='checkbox']");
  const qtyContainers = document.querySelectorAll(".qty");
  const marcadoSpan = document.querySelector(".marcado");
  const marcadoPrecoSpan = document.querySelector(".preco");
  const precoBase = 12.00; // Valor inicial

  function atualizarControles() {
    let notas = parseInt(notasElement.textContent) || 0;
    let totalSelecionado = 0;
    let selecionados = [];
    let precoTotal = precoBase;

    checkboxes.forEach((checkbox) => {
      const spanNome = checkbox.closest("label").querySelector("span"); // Nome do sabor
      const qtySpan = checkbox.closest("label").querySelector(".quantidade") || checkbox.closest("label").querySelector(".qty span");
      let qty = qtySpan ? parseInt(qtySpan.textContent) : 0;

      if (checkbox.checked) {
        totalSelecionado += Math.max(qty, 1);
        selecionados.push(`${spanNome.textContent} (${qty})`);

        // 🔹 Se estiver em Sabores Especiais, soma ao preço total
        if (checkbox.closest("#Sabores_2")) {
          precoTotal += qty * 1.00; // R$1,00 por unidade
        }
      } else {
        qtySpan.textContent = 1; // 🔹 Se desmarcar, reseta para 1
      }
    });

    // Atualizar os valores na tela
    marcadoSpan.textContent = selecionados.length > 0 ? selecionados.join(", ") : "Nenhum";
    marcadoPrecoSpan.textContent = precoTotal.toFixed(2).replace(".", ",");

    // Bloquear/desbloquear checkboxes
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = totalSelecionado >= notas;
      }
    });

    // Bloquear/desbloquear botões de incremento
    qtyContainers.forEach((qtyContainer) => {
      const checkbox = qtyContainer.closest("label").querySelector("input[type='checkbox']");
      const decrementButton = qtyContainer.querySelector("button:nth-child(1)");
      const incrementButton = qtyContainer.querySelector("button:nth-child(3)");
      const qtySpan = qtyContainer.querySelector("span");
      let qty = parseInt(qtySpan.textContent);

      if (checkbox.checked) {
        incrementButton.disabled = totalSelecionado >= notas;
        decrementButton.disabled = qty <= 1;
      } else {
        incrementButton.disabled = true;
        decrementButton.disabled = true;
      }
    });
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", atualizarControles);
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
      let qty = parseInt(qtySpan.textContent);
      if (qty > 1) {
        qtySpan.textContent = qty - 1;
        atualizarControles();
      }
    });
  });

  atualizarControles();
});