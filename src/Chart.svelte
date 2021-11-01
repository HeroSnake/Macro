<script>
    import Chart from "chart.js/auto"

    export let result, dark, isPhone, compare, i
    let specs = result.specs

    let specsTitle = specs.map(function (x) {
        return x[0]
    })
    let specsColors = specs.map(function (x) {
        return x[1]
    })
    let specsValues = specs.map(function (x) {
        return x[2]
    })

    var chartDonut = null

    let donutConfig = {
        type: "doughnut",
        data: {
            labels: specsTitle,
            datasets: [
                {
                    label: "Food Data Donut",
                    data: specsValues,
                    backgroundColor: specsColors,
                    hoverOffset: 6,
                    borderColor: dark ? "#1f2937" : "white",
                    borderWidth: isPhone || compare ? 1 : 3
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: isPhone && compare ? '7px' : '10px',
                            family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        },
                        color: dark ? "white" : "black",
                    },
                },
            },
            responsive: true
        },
    }

    let updateCharts = (chartDonut) => {
        if (chartDonut) {
            chartDonut.options.plugins.legend.labels.color = dark
                ? "white"
                : "black"
            chartDonut.data.datasets[0].borderColor = dark
                ? "#1f2937"
                : "white"
            chartDonut.update()
        } else {
            return false
        }
    }
    const setChart = () => {
        chartDonut = new Chart(document.getElementById("chartDonut"+i), donutConfig)
    }
    $: dark,updateCharts(chartDonut)
    setTimeout(setChart, 20)
</script>

<canvas id="chartDonut{i}" />
