function calcular() {
  const capital = parseFloat(document.getElementById("capital").value);
  const taxa = parseFloat(document.getElementById("taxa").value) / 100;
  const tempo = parseInt(document.getElementById("tempo").value);

  if (isNaN(capital) || isNaN(taxa) || isNaN(tempo)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const montante = capital * Math.pow(1 + taxa, tempo);
  const juros = montante - capital;

  document.getElementById("capitalOut").innerText = capital.toFixed(2);
  document.getElementById("taxaOut").innerText = (taxa * 100).toFixed(2);
  document.getElementById("tempoOut").innerText = tempo;
  document.getElementById("montante").innerText = montante.toFixed(2);
  document.getElementById("juros").innerText = juros.toFixed(2);
  document.getElementById("resultadoFinal").innerText = montante.toFixed(2);
}
