let grafico;

/* =========================
   FUNÇÃO PRINCIPAL
========================= */
function calcular() {
  const valorInicial = Number(document.getElementById('valorInicial').value) || 0;
  const aporte = Number(document.getElementById('aporte').value) || 0;
  const retirada = Number(document.getElementById('retirada').value) || 0;

  let taxa = Number(document.getElementById('taxa').value) / 100;
  let periodo = Number(document.getElementById('periodo').value);

  const tipoTaxa = document.getElementById('tipoTaxa').value;
  const tipoPeriodo = document.getElementById('tipoPeriodo').value;

  /* =========================
     AJUSTES DE TAXA E PERÍODO
  ========================= */
  if (tipoTaxa === 'anual') {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  if (tipoPeriodo === 'anos') {
    periodo = periodo * 12;
  }

  /* =========================
     VARIÁVEIS DE CÁLCULO
  ========================= */
  let saldo = valorInicial;
  let totalInvestido = valorInicial;

  const labels = [];
  const dadosSaldo = [];

  const tabela = document.getElementById('tabelaEvolucao');
  tabela.innerHTML = '';

  /* =========================
     LOOP MÊS A MÊS
  ========================= */
  for (let mes = 1; mes <= periodo; mes++) {
    // aporte
    saldo += aporte;
    totalInvestido += aporte;

    // juros
    const juros = saldo * taxa;
    saldo += juros;

    // retirada
    saldo -= retirada;
    if (saldo < 0) saldo = 0;

    // dados para gráfico
    labels.push(`Mês ${mes}`);
    dadosSaldo.push(saldo.toFixed(2));

    // tabela
    tabela.innerHTML += `
      <tr>
        <td>${mes}</td>
        <td>R$ ${totalInvestido.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>
    `;

    // se o saldo zerar, interrompe
    if (saldo === 0) break;
  }

  document.getElementById('montanteFinal').innerText = saldo.toFixed(2);

  desenharGrafico(labels, dadosSaldo);
}

/* =========================
   GRÁFICO (Chart.js)
========================= */
function desenharGrafico(labels, dados) {
  const ctx = document.getElementById('graficoSaldo').getContext('2d');

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Evolução do Saldo',
        data: dados,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'R$ ' + Number(context.raw).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
              });
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return 'R$ ' + value;
            }
          }
        }
      }
    }
  });
}
