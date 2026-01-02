function calcular() {
  const valorInicial = Number(document.getElementById('valorInicial').value) || 0;
  const aporte = Number(document.getElementById('aporte').value) || 0;
  let taxa = Number(document.getElementById('taxa').value) / 100;
  let periodo = Number(document.getElementById('periodo').value);

  const tipoTaxa = document.getElementById('tipoTaxa').value;
  const tipoPeriodo = document.getElementById('tipoPeriodo').value;

  if (tipoTaxa === 'anual') {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  if (tipoPeriodo === 'anos') {
    periodo = periodo * 12;
  }

  let saldo = valorInicial;
  let totalInvestido = valorInicial;
  const tbody = document.getElementById('tabelaEvolucao');
  tbody.innerHTML = '';

  for (let i = 1; i <= periodo; i++) {
    saldo += aporte;
    totalInvestido += aporte;

    const juros = saldo * taxa;
    saldo += juros;

    const linha = `
      <tr>
        <td>${i}</td>
        <td>R$ ${totalInvestido.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>
    `;
    tbody.innerHTML += linha;
  }

  document.getElementById('montanteFinal').innerText = saldo.toFixed(2);
  document.getElementById('totalInvestido').innerText = totalInvestido.toFixed(2);
  document.getElementById('rendimento').innerText = (saldo - totalInvestido).toFixed(2);
}
