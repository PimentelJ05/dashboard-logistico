const API = "http://127.0.0.1:5000/custos";

fetch(API)
  .then(res => res.json())
  .then(data => {

    document.getElementById("maior-tarifa").textContent =
      "R$ " + data.maior_tarifa.toLocaleString("pt-BR");

    document.getElementById("menor-tarifa").textContent =
      "R$ " + data.menor_tarifa.toLocaleString("pt-BR");

    document.getElementById("tarifa-media").textContent =
      "R$ " + data.tarifa_media.toLocaleString("pt-BR");

    document.getElementById("amplitude").textContent =
      "R$ " + data.amplitude.toLocaleString("pt-BR");

    const labels =
      data.evolucao.map(item => item["KM Final"]);

    const valores =
      data.evolucao.map(item => item["Custo Fixo"]);

    new Chart(
      document.getElementById("evolucaoChart"),
      {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Custo",
            data: valores,
            tension: 0.4,
            fill: true
          }]
        }
      }
    );

  });