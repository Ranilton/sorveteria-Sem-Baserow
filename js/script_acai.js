function mostrarAcai() {
  let select = document.getElementById("acai-tamanho");
  let imagem = document.getElementById("acai-imagem");
  let notas = document.getElementById("notas");
  let volume = document.querySelector(".volume");
  let preco = document.querySelector(".marcadopreco");

  let selectedOption = select.options[select.selectedIndex];

  // Se "Selecione" estiver ativo, limpa os campos
  if (!selectedOption.value) {
      imagem.src = "/assets/açaí.png"; // Define uma imagem padrão
      notas.textContent = "";
      volume.textContent = "Escolha um Tamanho";
      preco.textContent = "R$ 0,00";
      return;
  }

  let tipo = selectedOption.value;
  let nota = selectedOption.getAttribute("nota"); // Obtém o valor do atributo nota
  let precoValor = selectedOption.getAttribute("data-price"); // Obtém o preço

  // Atualiza a imagem (pode-se adicionar mais imagens para cada tamanho, se quiser)
  imagem.src = "/assets/açaí.png";

  // Atualiza os textos na página
  volume.textContent = tipo;
  preco.textContent = "R$ " + parseFloat(precoValor).toFixed(2);
  notas.textContent = nota ? "Nota: " + nota : "";
}
