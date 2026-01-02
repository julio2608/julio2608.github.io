<script>
let grafico = null;

function calcular() {
  // === ELEMENTOS (nomes SEM conflito com IDs) ===
  const valorInicialEl = document.getElementById("valorInicial");
  const aporteEl = document.getElementById("aporte");
  const retiradaEl = document.getElementById("retirada");
  const taxaEl = document.getElementById("taxa");
  const tipoTaxaEl = document.getElementById("tipoTaxa");
  const periodoEl = document.getElementById("periodo");
  const tipoPeriodoEl = document.getElementById("tipoPeriodo");
  const tabelaEl = document.getElementById("tabelaEvolucao");
  const montanteFinalEl = document.getElementById("montanteFinal");

  // === VALORES ===
  let saldo = Number(valorInicialEl.value) || 0;
  let investido = saldo;
  const aporte = Number(aporteEl.value) || 0;
  const retirada = Number(retiradaEl.value) || 0;
  let taxa = (Number(taxaEl.value) || 0) / 100;
  let periodo = Number(periodoEl.value) || 0;

  // === CONVERSÕES ===
  if (tipoTaxaEl.value === "anual") {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  if (tipoPeriodoEl.value === "anos") {
    periodo = periodo * 12;
  }

  tabelaEl.innerHTML = "";

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

    tabelaEl.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>R$ ${investido.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>
    `;

    if (saldo === 0) break;
  }

  montanteFinalEl.innerText = saldo.toFixed(2).replace(".", ",");

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
      plugins: { legend: { display: false } },
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
