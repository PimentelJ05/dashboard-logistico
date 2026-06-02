const API = "http://127.0.0.1:5000/dashboard";

fetch(API)
  .then(res => res.json())
  .then(data => {

    document.getElementById("total-regioes").textContent =
      data.kpis.total_regioes;

    document.getElementById("total-zonas").textContent =
      data.kpis.total_zonas;

    document.getElementById("total-veiculos").textContent =
      data.kpis.total_veiculos;

    document.getElementById("custo-medio").textContent =
      "R$ " + data.kpis.custo_medio.toLocaleString("pt-BR");

    const regioes =
      data.custo_regiao.map(item => item.Região);

    const custosRegiao =
      data.custo_regiao.map(item => item["Custo Fixo"]);

    const veiculos =
      data.custo_veiculo.map(item => item.Veículo);

    const custosVeiculo =
      data.custo_veiculo.map(item => item["Custo Fixo"]);

    new Chart(
      document.getElementById("regiaoChart"),
      {
        type: "bar",
        data: {
          labels: regioes,
          datasets: [{
            label: "Custo Médio",
            data: custosRegiao
          }]
        }
      }
    );

    new Chart(
      document.getElementById("veiculoChart"),
      {
        type: "bar",
        data: {
          labels: veiculos,
          datasets: [{
            label: "Custo Médio",
            data: custosVeiculo
          }]
        }
      }
    );

    const tabela =
      document.getElementById("ranking-regioes");

    data.custo_regiao.forEach(
      (item, index) => {

        tabela.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${item.Região}</td>
            <td>R$ ${item["Custo Fixo"].toFixed(2)}</td>
          </tr>
        `;
      }
    );

  });