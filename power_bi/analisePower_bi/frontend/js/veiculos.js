const API = "http://127.0.0.1:5000/veiculos";

fetch(API)
  .then(res => res.json())
  .then(data => {

    document.getElementById("total-veiculos").textContent =
      data.total_veiculos;

    document.getElementById("mais-caro").textContent =
      data.mais_caro;

    document.getElementById("mais-barato").textContent =
      data.mais_barato;

    const labels =
      data.dados.map(item => item.Veículo);

    const valores =
      data.dados.map(item => item["Custo Fixo"]);

    new Chart(
      document.getElementById("veiculoChart"),
      {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Custo Médio",
            data: valores
          }]
        }
      }
    );

  });