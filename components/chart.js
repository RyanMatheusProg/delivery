for(const $ of screen.find(".x-chart")){
  const attr = $.attr("data-chart");
  $.parent.removeAttribute("data-chart");
  $.html("<canvas height=\"400\"></canvas>")
  const json = JSON.parse(attr);
  console.log(json);
  new Chart(
    $.parent.querySelector("canvas"),
    {
      type: "bar",
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            min: 0,
            max: Math.ceil((Math.max(...(json.map(e => e[1]))) + 20) / 10) * 10
          }
        }
      },
      data: {
        labels: json.map(e => e[0]),
        datasets: [
          {
            label: "Quantidade obtida",
            data: json.map(e => e[1])
          }
        ]
      }
    }
  )
}