const API_URL = "http://127.0.0.1:5000/regioes";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {

    const labels = data.dados.map(
      item => item["Região"]
    );

    const valores = data.dados.map(
      item => item["Custo Fixo"]
    );

    new Chart(
      document.getElementById("regioesChart"),
      {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Custo Médio",
            data: valores,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );

    const tabela =
      document.getElementById("ranking-regioes");

    data.dados.forEach((item, index) => {

      tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item["Região"]}</td>
          <td>R$ ${Number(item["Custo Fixo"]).toFixed(2)}</td>
        </tr>
      `;

    });

  })
  .catch(error => {
    console.error(error);
  });