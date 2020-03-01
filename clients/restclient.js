const fetch = require('node-fetch');
const constants = require('../constants/rest');

function fetchFromApi(endpoint, method, data) {
    let conf = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (data !== null) {
        conf.body = JSON.stringify(data);
    }
    fetch(`${constants.restUrl}/${endpoint}`, conf)
        .then(r => r.json())
        .then(resp => console.log('data returned:', resp));
}

function getAll() {
    fetchFromApi("comments", "GET")
}

function addComment(comment) {
    fetchFromApi("comments", "POST", comment)
}

function deleteComment(commentId) {
    fetchFromApi(`comments/${commentId}`, "DELETE")
}

function updateComment(id, comment) {
    fetchFromApi(`comments/${id}`, "PUT", comment)
}

function addComments(comments) {
    fetchFromApi(`comments/bulk`, "POST", comments)
}

function deleteComments(commentIds) {
    fetchFromApi(`comments/delete`, "DELETE", commentIds)
}

// getAll();
// addComment({text: "This is a rest client comment", likes: 200, author: "LSADLKJA"});
// deleteComment(4);
// updateComment(5, {text: "This is an updated comment from JSSC", likes: 10, author: "Ale"});