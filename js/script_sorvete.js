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
  notas.textContent = nota ? nota : "";
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
