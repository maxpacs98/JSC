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

async function getAllCommentsRest(timed) {
    return await fetchFromRestApi("comments", "GET", null, timed);
}

async function getOneCommentRest(commentId, timed) {
    return await fetchFromRestApi(`comments/${commentId}`, "GET", null, timed);
}

async function clearCommentsRest(timed) {
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

// POSTS
async function getAllPostsRest(timed) {
    return await fetchFromRestApi("posts", "GET", null, timed);
}

async function clearPostsRest(timed) {
    return await fetchFromRestApi("posts/clear", "DELETE", null, timed);
}

async function addPostsRest(posts, timed) {
    return await fetchFromRestApi(`posts/bulk`, "POST", posts, timed);
}

async function addPostRest(post, timed) {
    return await fetchFromRestApi("posts", "POST", post, timed);
}

module.exports = Object.freeze({
    getAllCommentsRest,
    addCommentRest,
    updateCommentRest,
    deleteCommentRest,
    addCommentsRest,
    deleteCommentsRest,
    clearCommentsRest,
    getOneCommentRest,
    getAllPostsRest,
    clearPostsRest,
    addPostsRest,
    addPostRest
});