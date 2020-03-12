const fetch = require('node-fetch');
const constants = require('../constants/rest');
const {performance} = require('perf_hooks');

async function fetchFromRestApi(endpoint, method, data, timed) {
    let conf = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (method !== "GET" && data != null) {
        conf.body = JSON.stringify(data);
    }
    const startTime = performance.now();
    const result = await fetch(`${constants.restUrl}/${endpoint}`, conf);
    const endTime = performance.now();
    if (timed === true) {
        return endTime - startTime;
    } else {
        return await result.json();
    }

}

async function getAllRest(timed) {
    return await fetchFromRestApi("comments", "GET", null, timed);
}

async function clearRest(timed) {
    return await fetchFromRestApi("comments/clear", "DELETE", null, timed);
}

async function addCommentRest(comment, timed) {
    return await fetchFromRestApi("comments", "POST", comment, timed);
}

async function deleteCommentRest(commentId, timed) {
    return await fetchFromRestApi(`comments/${commentId}`, "DELETE", null, timed);
}

async function updateCommentRest(id, comment, timed) {
    return await fetchFromRestApi(`comments/${id}`, "PUT", comment, timed);
}

async function addCommentsRest(comments, timed) {
    return await fetchFromRestApi(`comments/bulk`, "POST", comments, timed);
}

async function deleteCommentsRest(commentIds, timed) {
    return await fetchFromRestApi(`comments/delete`, "DELETE", commentIds, timed);
}

module.exports = Object.freeze({
    getAllRest,
    addCommentRest,
    updateCommentRest,
    deleteCommentRest,
    addCommentsRest,
    deleteCommentsRest,
    clearRest
});