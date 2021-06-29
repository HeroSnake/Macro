<script>
    import Chart from "chart.js/auto";

    export let specs, dark;

    let specsTitle = specs.map(function (x) {
        return x[0];
    });
    let specsColors = specs.map(function (x) {
        return x[1];
    });
    let specsValues = specs.map(function (x) {
        return x[2];
    });

    var chart = null;

    let config = {
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
                },
            ],
        },
        options: {
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
    };
    let updateCharts = (chart) => {
        if(chart){
            chart.options.plugins.legend.labels.color = dark ? "white" : "black";
            chart.data.datasets[0].borderColor = dark ? "#1f2937" : "white";
            chart.update();
        }else{
            return false;
        }
    };
    const setChart = () => {
        chart = new Chart(document.getElementById("chart"), config);
    };
    $: dark,updateCharts(chart);
    setTimeout(setChart, 20);
</script>

<canvas id="chart" />
