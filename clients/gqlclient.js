const fetch = require('node-fetch');
const queries = require('../constants/gql');
const {performance} = require('perf_hooks');

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

async function getAllGql(timed) {
    return await fetchFromGqlApi(queries.getCommentsQuery, null, timed)
}

async function clearGql(timed) {
    return await fetchFromGqlApi(queries.clearMutation, null, timed)
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
    return await fetchFromGqlApi(queries.bulkInsertMutation, {comments}, timed)
}

async function deleteCommentsGql(commentIds, timed) {
    return await fetchFromGqlApi(queries.deleteCommentsMutation, {commentIds}, timed)
}

module.exports = Object.freeze({
    getAllGql,
    addCommentGql,
    updateCommentGql,
    deleteCommentGql,
    addCommentsGql,
    deleteCommentsGql,
    clearGql
});
