document.querySelectorAll('.qty button').forEach(button => {
  button.addEventListener('click', function () {
    const isAdd = this.innerText === 'add';
    const qtySpan = this.parentNode.querySelector('span');
    let qty = parseInt(qtySpan.innerText);
    qty = isAdd ? qty + 1 : qty - 1;
    if (qty > 0) {
      qtySpan.innerText = qty;
    }
  });
});


  function alterarQuantidade(valor) {
    const precoUnitarioElement = document.getElementById('precoUni');
    const quantidadeElement = document.getElementById('quantidade');
    const totalElement = document.getElementById('totalpreco');

    // Obtendo o preço unitário e removendo "R$ " antes de converter
    const precoUnitario = parseFloat(precoUnitarioElement.textContent.replace('R$', '').trim());

    // Atualizando a quantidade
    let quantidade = parseInt(quantidadeElement.textContent);
    quantidade = Math.max(1, quantidade + valor); // Evita quantidade menor que 1
    quantidadeElement.textContent = quantidade;

    // Calculando o total
    const total = precoUnitario * quantidade;

    // Atualizando o total no DOM
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
  }

