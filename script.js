function calcular() {
  const salario = parseFloat(document.getElementById('salario').value) || 0;
  const inss = parseFloat(document.getElementById('inss').value) || 0;

  // ===== DEDUÇÃO =====
  let deducaoUsada, tipoDeducao;
  if (inss > 607.2) {
    deducaoUsada = inss;
    tipoDeducao = 'Dedução legal (INSS)';
  } else {
    deducaoUsada = 607.2;
    tipoDeducao = 'Desconto simplificado (25%)';
  }

  const baseCalc = salario - deducaoUsada;

  // ===== TABELA PROGRESSIVA =====
  let aliquota = 0,
    parcela = 0,
    faixaTabela = '';

  if (baseCalc <= 2428.8) {
    faixaTabela = '1ª faixa – Isento';
  } else if (baseCalc <= 2826.65) {
    aliquota = 0.075;
    parcela = 182.16;
    faixaTabela = '2ª faixa – 7,5%';
  } else if (baseCalc <= 3751.05) {
    aliquota = 0.15;
    parcela = 394.16;
    faixaTabela = '3ª faixa – 15%';
  } else if (baseCalc <= 4664.68) {
    aliquota = 0.225;
    parcela = 675.49;
    faixaTabela = '4ª faixa – 22,5%';
  } else {
    aliquota = 0.275;
    parcela = 908.73;
    faixaTabela = '5ª faixa – 27,5%';
  }

  const irTabela = Math.max(0, baseCalc * aliquota - parcela);

  // ===== REDUÇÃO (ART. 6º-A) =====
  let reducao = 0,
    faixaReducao = '';

  if (salario <= 5000) {
    faixaReducao = 'Isenção total (até R$ 5.000)';
    reducao = irTabela;
  } else if (salario <= 7350) {
    faixaReducao = 'Redução progressiva';
    reducao = 978.62 - 0.133145 * salario;
    if (reducao < 0) reducao = 0;
  } else {
    faixaReducao = 'Sem redução legal';
  }

  const irFinal = Math.max(0, irTabela - reducao);

  // ===== SAÍDA =====
  document.getElementById('tipoDeducao').innerText = tipoDeducao;
  document.getElementById('deducaoUsada').innerText = deducaoUsada.toFixed(2);
  document.getElementById('baseCalc').innerText = baseCalc.toFixed(2);
  document.getElementById('faixaTabela').innerText = faixaTabela;
  document.getElementById('aliquota').innerText =
    (aliquota * 100).toFixed(2) + '%';
  document.getElementById('parcela').innerText = parcela.toFixed(2);
  document.getElementById('irTabela').innerText = irTabela.toFixed(2);
  document.getElementById('faixaReducao').innerText = faixaReducao;
  document.getElementById('reducao').innerText = reducao.toFixed(2);
  document.getElementById('irFinal').innerText = irFinal.toFixed(2);
}
