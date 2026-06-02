const API_URL = "http://127.0.0.1:5000/operacoes";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {

    document.getElementById("km-medio-op").textContent =
      data.km_inicial_medio.toFixed(0);

    document.getElementById("maior-km").textContent =
      data.maior_km.toFixed(0);

    document.getElementById("paradas-media").textContent =
      data.km_final_medio.toFixed(0);

    document.getElementById("maior-operacao-op").textContent =
      data.maior_km.toFixed(0);

  })
  .catch(console.error);