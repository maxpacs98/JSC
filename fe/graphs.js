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
                data: [30.22, 7.86, 8.56, 8.98, 9.23, 8.44, 11.22, 12.10, 8.23, 9.21],
                fill: false,
                borderColor: '#FF6F61',
                borderWidth: 2
            }, {
                label: "Hipster",
                data: [6.23, 7.11, 9.22, 6.78, 7.77, 8.30, 5.22, 6, 6.12, 9.30],
                fill: false,
                borderColor: '#6B5B95',
                borderWidth: 2
            }]
        },
        options: Object.assign({}, commonOptions, {
            title: {
                display: true,
                text: "Get All 1st Modelling",
                fontSize: 18
            }
        })
    });
}
