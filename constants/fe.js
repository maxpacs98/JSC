export const commonOptions = {
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

export const pageOneInfo = 'First modelling is a Comment: id, likes, text, author, timestamp';
export const pageTwoInfo = 'Second modelling is a Post entity: id, likes, text, author, a list of Comments';