const rest = require('../clients/restclient');
const gql = require('../clients/gqlclient');
const { generateComments } = require("../common/mock");
const { benchmarkGetAll, benchmarkBulkAdd } = require("../common/benchmarking");


function benchmarkGetAllComments() {
    benchmarkGetAll(rest.getAllCommentsRest, gql.getAllCommentsGql);
}

function benchmarkAddComment() {
    benchmarkBulkAdd(generateComments, rest.addCommentsRest, gql.addCommentGql, rest.clearCommentsRest, gql.clearCommentsGql);
}

function benchmarkBulkAddComments() {
    benchmarkBulkAdd(generateComments, rest.addCommentsRest, gql.addCommentsGql, rest.clearCommentsRest, gql.clearCommentsGql);
}

// benchmarkGetAllComments();

// benchmarkGetAllComments();