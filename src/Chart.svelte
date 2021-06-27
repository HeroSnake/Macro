<script>
    import Chart from "chart.js/auto";

    export let result, specs;

    let specsTitle = specs.map(function (x) {
        return x[0];
    });
    let specsColors = specs.map(function (x) {
        return x[1];
    });
    let specsValues = specs.map(function (x) {
        return x[2];
    });

    var donutChart = null;

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
                    },
                },
            },
        },
    };

    const setChart = () => {
        donutChart = new Chart(
            document.getElementById("donutChart"),
            donutConfig
        );
        // donutChart.canvas.parentNode.style.height =
        //     donutChart.canvas.parentNode.style.width = "300px";
    };

    setTimeout(setChart, 20);
</script>

<canvas id="donutChart" />
