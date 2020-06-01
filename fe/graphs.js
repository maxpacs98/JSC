import {
    getAllPostsRest,
    addPostsRest,
    addPostRest,
    updatePostCommentRest,
    getAllCommentsRest,
    addCommentsRest,
    addCommentRest,
    deleteCommentRest,
    updateCommentRest
} from "../clients/restclient.js";
import {
    benchmarkGetAll,
    benchmarkBulkAdd,
    benchmarkAdd,
    benchmarkUpdateNested,
    benchmarkDelete,
    benchmarkUpdate
} from "../common/benchmarking.js"
import {
    getAllPostsGql,
    addPostsGql,
    addPostGql,
    updatePostCommentGql,
    getAllCommentsGql,
    addCommentsGql,
    addCommentGql,
    deleteCommentGql,
    updateCommentGql
} from "../clients/gqlclient.js";
import {generatePosts, generateComments} from "../common/mock.js"
import {commonOptions} from "../constants/fe.js";

let charts = {};
let currentPage = 1;


function createRequestsChart(elementId, title) {
    return new Chart(document.getElementById(elementId), {
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
                text: title,
                fontSize: 18,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Milliseconds',
                    }
                }]
            },
            onClick: async function (ev) {
                const chart = charts[this.canvas.id];
                await updateChart(chart);
            },
        })
    });
}

function createBarChart(elementId, title) {
    return new Chart(document.getElementById(elementId), {
        type: 'bar',
        data: {
            labels: ["Geek", "Hipster"],
            datasets: [{
                labels: ["Geek", "Hipster"],
                fill: false,
                borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderWidth: 2
            }]
        },
        options: Object.assign({}, commonOptions, {
            title: {
                display: true,
                text: title,
                fontSize: 18,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.2
                }],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: 3,
                            callback: function (value) {
                                return value + "%";
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage',
                        },
                    },
                ],
            }
        })
    });
}

function createAllCharts() {
    const getCommentsChartInstance = createRequestsChart("getCommentsChart", "Get All 1st Modeling");
    const addCommentsChartInstance = createRequestsChart("addCommentsChart", "Bulk Add 1st Modeling");
    const addCommentChartInstance = createRequestsChart("addCommentChart", "Add 1st Modeling");
    const deleteCommentChartInstance = createRequestsChart("deleteCommentChart", "Delete 1st Modeling");
    const updateCommentChartInstance = createRequestsChart("updateCommentChart", "Update 1st Modeling");

    const getPostsChartInstance = createRequestsChart("getPostsChart", "Get All 2nd Modeling");
    const addPostsChartInstance = createRequestsChart("addPostsChart", "Bulk Add 2nd Modeling");
    const addPostChartInstance = createRequestsChart("addPostChart", "Add 2nd Modeling");
    const updatePostChartInstance = createRequestsChart("updatePostChart", "Update Nested Comment 2nd Modeling");

    const cpuUsageChart = createBarChart("cpuUsageChart", "% Cpu Usage");

    return {
        "getCommentsChart": {
            obj: getCommentsChartInstance,
            fun: benchmarkGetAll,
            argz: [getAllCommentsRest, getAllCommentsGql]
        },
        "addCommentsChart": {
            obj: addCommentsChartInstance,
            fun: benchmarkBulkAdd,
            argz: [generateComments, addCommentsRest, addCommentsGql]
        },
        "addCommentChart": {
            obj: addCommentChartInstance,
            fun: benchmarkAdd,
            argz: [generateComments, addCommentRest, addCommentGql]
        },
        "deleteCommentChart": {
            obj: deleteCommentChartInstance,
            fun: benchmarkDelete,
            argz: [generateComments, deleteCommentRest, deleteCommentGql, addCommentRest, addCommentGql]
        },
        "updateCommentChart": {
            obj: updateCommentChartInstance,
            fun: benchmarkUpdate,
            argz: [generateComments, updateCommentRest, updateCommentGql]
        },

        "getPostsChart": {
            obj: getPostsChartInstance,
            fun: benchmarkGetAll,
            argz: [getAllPostsRest, getAllPostsGql]
        },
        "addPostsChart": {
            obj: addPostsChartInstance,
            fun: benchmarkBulkAdd,
            argz: [generatePosts, addPostsRest, addPostsGql]
        },
        "addPostChart": {
            obj: addPostChartInstance,
            fun: benchmarkAdd,
            argz: [generatePosts, addPostRest, addPostGql]
        },
        "updatePostChart": {
            obj: updatePostChartInstance,
            fun: benchmarkUpdateNested,
            argz: [updatePostCommentRest, updatePostCommentGql]
        },
        "cpuUsageChart": {
            obj: cpuUsageChart,
            fun: null,
            argz: null
        }
    }
}

function paginate(currentButton, disableButton) {
    for (let chart in charts) {
        let elem = document.getElementById(chart);
        if ((currentPage === 1 && chart.includes("Post")) || (currentPage === 2 && chart.includes("Comment"))) {
            elem.parentElement.classList.add("hidden");
        } else {
            elem.parentElement.classList.remove("hidden");
        }
    }
    currentButton.parentElement.classList.remove("hidden");
    disableButton.parentElement.classList.add("hidden");
}

window.onload = async function () {
    charts = createAllCharts();
    const next = document.getElementsByClassName("pageButton")[0];
    const prev = document.getElementsByClassName("pageButton")[1];
    next.onclick = function () {
        currentPage += 1;
        paginate(prev, next);
    }

    prev.onclick = function () {
        currentPage -= 1;
        paginate(next, prev);
    }

    const ws = new WebSocket("ws://127.0.0.1:8765/");
    ws.onmessage = function (event) {
        const values = Object.values(JSON.parse(event.data).data);
        charts.cpuUsageChart.obj.data.datasets[0].data = values;
        if (values[0] < 3 && values[1] < 3) {
            charts.cpuUsageChart.obj.options.scales.yAxes[0].ticks.max = 3;
        } else {
            charts.cpuUsageChart.obj.options.scales.yAxes[0].ticks.max = 100;
        }
        charts.cpuUsageChart.obj.update();
    };

    document.getElementById("resetButton").addEventListener('click', async function () {
        for (let chart in charts) {
            let elem = document.getElementById(chart);
            if (!chart.includes("cpu") && !elem.parentElement.classList.contains("hidden")) {
                charts[chart].obj.data.datasets[0].data = [];
                charts[chart].obj.data.datasets[1].data = [];
                charts[chart].obj.update();
            }
        }
        // let promises = [];
        // const startTime = performance.now();
        // for (let i = 0; i < 1000; i++) {
        //     promises.push(fetch(
        //         'http://localhost:8080/health'
        //     ));
        // }
        // await Promise.all(promises);
        // const endTime = performance.now();
        // console.log(endTime - startTime);
    });

    document.getElementById("launchButton").onclick = async function () {
        for (let chart in charts) {
            let elem = document.getElementById(chart);

            if (!chart.includes("cpu") && !elem.parentElement.classList.contains("hidden")) {
                await updateChart(charts[chart]);
            }
        }
    }

    // const startAllButton = document.getElementById("startAll");
    // startAllButton.onclick = async function () {
    //     let promises = [];
    //     for (let chart of charts) {
    //         promises.push(
    //             new Promise(async function (resolve, reject) {
    //                 await updateChart(chart);
    //                 resolve();
    //             })
    //         )
    //     }
    //     await Promise.all(promises);
    // }
}

async function updateChart(chart) {
    chart.obj.data.datasets[0].data = [];
    chart.obj.data.datasets[1].data = [];
    let generator = chart.fun(...chart.argz);
    for await (let iteration of generator) {
        chart.obj.data.datasets[0].data.push(iteration.restResult.value)
        chart.obj.data.datasets[1].data.push(iteration.gqlResult.value)
        chart.obj.update();
    }
}