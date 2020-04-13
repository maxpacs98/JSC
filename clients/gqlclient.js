const fetch = require('node-fetch');
const queries = require('../constants/gql');
const { performance } = require('perf_hooks');

async function fetchFromGqlApi(query, variables, timed) {
    conf = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query, variables
        })
    };
    const startTime = performance.now();
    const result = await fetch(queries.gqlUrl, conf);
    const endTime = performance.now();
    if (timed === true) {
        return endTime - startTime;
    } else {
        const jsRes = await result.json();
        return jsRes.data[Object.keys(jsRes.data)[0]];
    }
}

async function getAllCommentsGql(timed) {
    return await fetchFromGqlApi(queries.getCommentsQuery, null, timed)
}

async function getOneCommentGql(commentId, timed) {
    return await fetchFromGqlApi(queries.getCommentQuery, {commentId}, timed)
}

async function clearCommentsGql(timed) {
    return await fetchFromGqlApi(queries.clearCommentsMutation, null, timed)
}

async function deleteCommentGql(commentId, timed) {
    return await fetchFromGqlApi(queries.deleteCommentMutation, {commentId}, timed)
}

async function addCommentGql(comment, timed) {
    return await fetchFromGqlApi(queries.addCommentMutation, {comment}, timed)
}

async function updateCommentGql(text, likes, author, id, timed) {
    return await fetchFromGqlApi(queries.updateCommentMutation, {id, text, likes, author}, timed)
}

async function addCommentsGql(comments, timed) {
    return await fetchFromGqlApi(queries.bulkInsertCommentsMutation, {comments}, timed)
}

async function deleteCommentsGql(commentIds, timed) {
    return await fetchFromGqlApi(queries.deleteCommentsMutation, {commentIds}, timed)
}

async function getAllPostsGql(timed) {
    return await fetchFromGqlApi(queries.getAllPostsQuery, null, timed)
}

async function clearPostsGql(timed) {
    return await fetchFromGqlApi(queries.clearPostsMutation, null, timed)
}

async function addPostsGql(posts, timed) {
    return await fetchFromGqlApi(queries.bulkInsertPostsMutation, {posts}, timed)
}

async function addPostGql(post, timed) {
    return await fetchFromGqlApi(queries.addPostMutation, {post}, timed)
}

async function updatePostCommentGql(postId, commentId, text, author, likes, timed) {
    return await fetchFromGqlApi(queries.updatePostCommentMutation, {postId, commentId, text, author, likes}, timed)
}

module.exports = Object.freeze({
    getAllCommentsGql,
    addCommentGql,
    updateCommentGql,
    deleteCommentGql,
    addCommentsGql,
    deleteCommentsGql,
    clearCommentsGql,
    getOneCommentGql,
    getAllPostsGql,
    clearPostsGql,
    addPostsGql,
    addPostGql,
    updatePostCommentGql
});
