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

function mostrarMilks() {
  let select = document.getElementById("milk-tamanho");
  let imagem = document.getElementById("milk-imagem");
  let notas = document.getElementById("notas");
  let volume = document.querySelector(".volume");
  let preco = document.querySelector(".marcadopreco");

  let selectedOption = select.options[select.selectedIndex];

  // Se "Selecione" estiver ativo, limpa os campos
  if (!selectedOption.value) {
      imagem.src = "/assets/milkshake.png"; // Define uma imagem padrão
      notas.textContent = "";
      volume.textContent = "Escolha um Milkshake";
      preco.textContent = "R$ 0,00";
      return;
  }

  let tipo = selectedOption.value;
  let nota = selectedOption.getAttribute("nota"); // Obtém o valor do atributo nota
  let precoValor = selectedOption.getAttribute("data-price"); // Obtém o preço

  // Atualiza a imagem (pode-se adicionar mais imagens para cada tamanho, se quiser)
  imagem.src = "/assets/milkshake.png";

  // Atualiza os textos na página
  volume.textContent = tipo;
  preco.textContent = "R$ " + parseFloat(precoValor).toFixed(2);
  notas.textContent = nota ? "Nota: " + nota : "";
}
