let grafico = null;

function calcular() {
  // === ENTRADAS ===
  const valorInicial = parseFloat(document.getElementById("valorInicial").value) || 0;
  const aporte = parseFloat(document.getElementById("aporte").value) || 0;
  const retirada = parseFloat(document.getElementById("retirada").value) || 0;
  const taxa = parseFloat(document.getElementById("taxa").value) || 0;
  const tipoTaxa = document.getElementById("tipoTaxa").value;
  const periodo = parseInt(document.getElementById("periodo").value) || 0;
  const tipoPeriodo = document.getElementById("tipoPeriodo").value;

  // === CONVERSÕES ===
  let taxaPeriodo = taxa / 100;
  let totalPeriodos = periodo;

  if (tipoTaxa === "anual") {
    taxaPeriodo = Math.pow(1 + taxa / 100, 1 / 12) - 1;
  }

  if (tipoPeriodo === "anos") {
    totalPeriodos = periodo * 12;
  }

  // === CÁLCULO ===
  let saldo = valorInicial;
  let labels = [];
  let valores = [];

  const tabela = document.getElementById("tabelaEvolucao");
  tabela.innerHTML = "";

  for (let i = 1; i <= totalPeriodos; i++) {
    saldo = saldo * (1 + taxaPeriodo) + aporte - retirada;

    labels.push(i);
    valores.push(saldo);

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${i}</td>
      <td>R$ ${saldo.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  }

  // === RESULTADO FINAL ===
  document.getElementById("montanteFinal").innerText =
    saldo.toFixed(2).replace(".", ",");

  // === GRÁFICO ===
  const ctx = document.getElementById("graficoSaldo").getContext("2d");

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Evolução do saldo",
        data: valores,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
