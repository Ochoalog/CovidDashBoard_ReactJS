(() => {
  document.getElementById('cmbCountry').addEventListener('change', handlerChange);
  document.getElementById('date_start').addEventListener('change', handlerChange);
  document.getElementById('date_end').addEventListener('change', handlerChange);


  (async () => {
    let response = await Promise.allSettled([
      fetch('https://api.covid19api.com/countries'),
      fetch('https://api.covid19api.com/summary')
    ])

    if (response[0].status === 'fulfilled') {
      loadCountries(await response[0].value.json())
    }

    if (response[1].status === 'fulfilled') {
      loadSummary(await response[1].value.json())
    }
  })();
})();

function loadCountries(data) {
  let combo = document.getElementById('cmbCountry');

  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(
      data[index].Country,
      data[index].Country
    )
  }
}

function loadSummary(data) {
  let confirmed = document.getElementById('kpiconfirmed');
  let death = document.getElementById('kpideaths');
  let recovered = document.getElementById('kpirecovered');

  confirmed.innerText = data.Global.TotalConfirmed.toLocaleString('PT');
  death.innerText = data.Global.TotalDeaths.toLocaleString('PT');
  recovered.innerText = data.Global.TotalRecovered.toLocaleString('PT');
}

function handlerChange() {

  let country = document.getElementById('cmbCountry').value;
  if (country !== 'Global') {
    let startDate = new Date(document.getElementById('date_start').value);
    let endDate = new Date(document.getElementById('date_end').value);

    fetch(`https://api.covid19api.com/country/${country}?from=${startDate.toISOString()}&to=${endDate.toISOString()}`)
      .then(response => response.json())
      .then((json) => loadData(json));
  }
}

function loadData(json) {

  document.getElementById('kpiconfirmed').innerText = json[2].Confirmed.toLocaleString('PT');
  document.getElementById('kpideaths').innerText = json[2].Deaths.toLocaleString('PT');
  document.getElementById('kpirecovered').innerText = json[2].Recovered.toLocaleString('PT');
}

const interval = (start, end) => {
  return intervalToDuration({
    start: start,
    end: end
  });
};

let linha = new Chart(document.getElementById('linhas'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      label: 'Casos Confirmados',
      backgroundColor: '#0F5F0F'
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
        text: 'Curva diária de Covid-19'
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
