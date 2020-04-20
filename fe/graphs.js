import { getAllPostsRest } from "../clients/restclient.js";
import { benchmarkGetAll } from "../common/benchmarking.js"
import { getAllPostsGql } from "../clients/gqlclient.js";

const commonOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    tooltips: {
        enabled: false
    }
};

window.onload = function () {
    const testChartInstance = new Chart(document.getElementById("testChart"), {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [{
                label: "Geek",
                fill: false,
                borderColor: '#FF6F61',
                borderWidth: 2
            }, {
                label: "Hipster",
                fill: false,
                borderColor: '#6B5B95',
                borderWidth: 2
            }]
        },
        options: Object.assign({}, commonOptions, {
            title: {
                display: true,
                text: "Get All 2nd Modelling",
                fontSize: 18
            }
        })
    });

    const startAllButton = document.getElementById("startAll");
    startAllButton.onclick = async function () {
        let generator = benchmarkGetAll(getAllPostsRest, getAllPostsGql);
        for await (let iteration of generator) {
            testChartInstance.data.datasets[0].data.push(iteration.restResult.value)
            testChartInstance.data.datasets[1].data.push(iteration.gqlResult.value)
            testChartInstance.update();
        }
    }
}
