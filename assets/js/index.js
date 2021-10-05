(() => {

  (async () => {
    let response = await Promise.allSettled([
      fetch("https://api.covid19api.com/summary")
    ]);

    if (response[0].status == "fulfilled") {
      loadSummary(await response[0].value.json());
    }
  })();
})();

function loadSummary(data) {

  console.log(data);
  let confirmed = document.getElementById("confirmed");
  let death = document.getElementById("death");
  let recovered = document.getElementById("recovered");
  let date = document.getElementById("date");

  confirmed.innerText = data.Global.TotalConfirmed.toLocaleString("PT");
  death.innerText = data.Global.TotalDeaths.toLocaleString("PT");
  recovered.innerText = data.Global.TotalRecovered.toLocaleString("PT");
  date.innerText = data.Global.Date;
}

let bar = new Chart(document.getElementById('barras'), {
  type: 'bar',
  data: {
    labels: ['Palio', 'Uno', 'Gol', 'HB20', 'Up'],
    datasets: [{
      label: 'Realizado',
      data: [10, 35, 49, 11, 3],
      backgroundColor: 'red'
    }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: top
      },
      title: {
        display: true,
        text: "Total de numeros de mortes por País - Top 10"
      }
    }
  }
});

let linha = new Chart(document.getElementById('pizza'), {
  type: 'pie',
  data: {
    labels: ['Confirmados', 'Mortes', 'Recuperados'],
    datasets: [
      {
        data: [1123, 2000, 1500],
        label: 'Casos Confirmados',
        backgroundColor: 'blue'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: top
      },
      title: {
        display: true,
        text: 'Distribuição de novos casos'
      },
      layout: {
        padding: {
          left: 100,
          right: 100,
          top: 50,
          bottom: 50
        }
      }
    }
  }
});