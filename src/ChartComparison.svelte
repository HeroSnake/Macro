<script>
    import Chart from "chart.js/auto"

    export let results, ingredients, dark

    let specsValues = []
    results.forEach((result, index) => {
        specsValues[index] = Object.values(result.specs).map((spec) => {
            return spec.quantity
        })
    })

    var chartRadar = null
    let colors = ["255, 99, 132", "54, 162, 235"]

    let radarConfig = {
        type: "bar",
        data: {
            labels: Object.keys(results[0].specs),
            datasets: [
                {
                    label: ingredients[0],
                    data: specsValues[0],
                    fill: true,
                    backgroundColor: "rgba(" + colors[0] + ", 0.5)",
                },
                {
                    label: ingredients[1],
                    data: specsValues[1],
                    fill: true,
                    backgroundColor: "rgba(" + colors[1] + ", 0.5)",
                },
            ],
        },
        options: {
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             fontColor: "green",
            //             beginAtZero: true
            //         }
            //     }],
            //     xAxes: [{
            //         ticks: {
            //             fontColor: "purple",
            //             beginAtZero: true
            //         }
            //     }]
            // },
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        },
                        color: dark ? "white" : "black",
                    },
                },
            },
        },
    }

    let updateCharts = (chart) => {
        if (chart) {
            chart.options.plugins.legend.labels.color = dark
                ? "white"
                : "black"
            chart.data.datasets[0].borderColor = dark ? "#1f2937" : "white"
            chart.update()
        } else {
            return false
        }
    }
    const setChart = () => {
        chartRadar = new Chart(document.getElementById("chartRadar"), radarConfig)
    }
    $: dark, updateCharts(chartRadar)
    setTimeout(setChart, 20)
</script>

<canvas id="chartRadar" />
