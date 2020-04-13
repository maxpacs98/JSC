const rest = require('../clients/restclient');
const gql = require('../clients/gqlclient');
const { generatePosts } = require("../common/mock");
const { benchmarkGetAll, benchmarkBulkAdd, benchmarkAdd, benchmarkUpdateNested } = require("../common/benchmarking");

function benchmarkGetAllPosts() {
    benchmarkGetAll(rest.getAllPostsRest, gql.getAllPostsGql);
}

function benchmarkAddPost() {
    benchmarkAdd(generatePosts, rest.addPostRest, gql.addPostGql, rest.clearPostsRest, gql.clearPostsGql);
}

function benchmarkBulkAddPosts() {
    benchmarkBulkAdd(generatePosts, rest.addPostsRest, gql.addPostsGql, rest.clearPostsRest, gql.clearPostsGql);
}

function benchmarkUpdatePostComment() {
    benchmarkUpdateNested(rest.updatePostCommentRest, gql.updatePostCommentGql).then(
        console.log('plm')
    );
}


benchmarkGetAllPosts();
// benchmarkAddPost();
// benchmarkBulkAddPosts();
// benchmarkUpdatePostComment();