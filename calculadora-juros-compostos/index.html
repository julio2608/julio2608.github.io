<script>
let grafico = null;

function calcular() {
  // === PEGAR ELEMENTOS ===
  const valorInicialInput = document.getElementById("valorInicial");
  const aporteInput = document.getElementById("aporte");
  const retiradaInput = document.getElementById("retirada");
  const taxaInput = document.getElementById("taxa");
  const tipoTaxaSelect = document.getElementById("tipoTaxa");
  const periodoInput = document.getElementById("periodo");
  const tipoPeriodoSelect = document.getElementById("tipoPeriodo");
  const tabela = document.getElementById("tabelaEvolucao");
  const montanteFinalSpan = document.getElementById("montanteFinal");

  // === VALORES ===
  const valorInicial = Number(valorInicialInput.value) || 0;
  const aporte = Number(aporteInput.value) || 0;
  const retirada = Number(retiradaInput.value) || 0;
  let taxa = Number(taxaInput.value) / 100;
  let periodo = Number(periodoInput.value) || 0;

  // === CONVERSÕES ===
  if (tipoTaxaSelect.value === "anual") {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  if (tipoPeriodoSelect.value === "anos") {
    periodo = periodo * 12;
  }

  // === CÁLCULO ===
  let saldo = valorInicial;
  let investido = valorInicial;

  tabela.innerHTML = "";

  const labels = [];
  const dados = [];

  for (let i = 1; i <= periodo; i++) {
    saldo += aporte;
    investido += aporte;

    const juros = saldo * taxa;
    saldo += juros;

    saldo -= retirada;
    if (saldo < 0) saldo = 0;

    labels.push(`Mês ${i}`);
    dados.push(saldo.toFixed(2));

    tabela.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>R$ ${investido.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>
    `;

    if (saldo === 0) break;
  }

  montanteFinalSpan.innerText = saldo.toFixed(2).replace(".", ",");

  desenharGrafico(labels, dados);
}

function desenharGrafico(labels, dados) {
  const ctx = document.getElementById("graficoSaldo");

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Saldo acumulado",
        data: dados,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          ticks: {
            callback: v => "R$ " + v
          }
        }
      }
    }
  });
}
</script>
