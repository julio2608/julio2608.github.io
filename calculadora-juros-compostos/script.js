let grafico;

function calcular() {
  const valorInicial = Number(document.getElementById('valorInicial').value) || 0;
  const aporte = Number(document.getElementById('aporte').value) || 0;
  const retirada = Number(document.getElementById('retirada').value) || 0;

  let taxa = Number(document.getElementById('taxa').value) / 100;
  let periodo = Number(document.getElementById('periodo').value);

  const tipoTaxa = document.getElementById('tipoTaxa').value;
  const tipoPeriodo = document.getElementById('tipoPeriodo').value;

  // Converter taxa anual para mensal
  if (tipoTaxa === 'anual') {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  // Converter anos para meses
  if (tipoPeriodo === 'anos') {
    periodo *= 12;
  }

  let saldo = valorInicial;
  let totalInvestido = valorInicial;

  const tabela = document.getElementById('tabelaEvolucao');
  tabela.innerHTML = '';

  const labels = [];
  const dadosSaldo = [];

  for (let mes = 1; mes <= periodo; mes++) {
    saldo += aporte;
    totalInvestido += aporte;

    const juros = saldo * taxa;
    saldo += juros;

    saldo -= retirada;

    if (saldo < 0) saldo = 0;

    labels.push(`Mês ${mes}`);
    dadosSaldo.push(saldo.toFixed(2));

    tabela.innerHTML += `
      <tr>
        <td>${mes}</td>
        <td>R$ ${totalInvestido.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>
    `;

    if (saldo === 0) break;
  }

  document.getElementById('montanteFinal').innerText = saldo.toFixed(2);
  document.getElementById('totalInvestido').innerText = totalInvestido.toFixed(2);
  document.getElementById('rendimento').innerText = (saldo - totalInvestido).toFixed(2);

  desenharGrafico(labels, dadosSaldo);
}

function desenharGrafico(labels, dados) {
  const ctx = document.getElementById('graficoSaldo').getContext('2d');

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Saldo (R$)',
        data: dados,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          ticks: {
            callback: value => 'R$ ' + value
          }
        }
      }
    }
  });
}
