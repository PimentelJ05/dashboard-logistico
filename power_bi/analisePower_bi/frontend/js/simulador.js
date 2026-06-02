const API = "http://127.0.0.1:5000/simulador";

fetch(API)
  .then(res => res.json())
  .then(data => {

    document.getElementById("km-max").textContent =
      data.km_max.toLocaleString("pt-BR");

    document.getElementById("km-min").textContent =
      data.km_min.toLocaleString("pt-BR");

    document.getElementById("km-medio").textContent =
      data.km_medio.toLocaleString("pt-BR");

    const pontos =
      data.dados.map(item => ({
        x: item["KM Final"],
        y: item["Custo Fixo"]
      }));

    new Chart(
      document.getElementById("scatterChart"),
      {
        type: "scatter",
        data: {
          datasets: [{
            label: "KM x Custo",
            data: pontos
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "KM Final"
              }
            },
            y: {
              title: {
                display: true,
                text: "Custo Fixo"
              }
            }
          }
        }
      }
    );

  });