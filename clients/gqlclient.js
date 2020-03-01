const fetch = require('node-fetch');
const queries = require('../constants/gql');

function fetchFromApi(query, variables) {
    fetch(queries.gqlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query, variables
        })
    })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
}

function getAll() {
    fetchFromApi(queries.getCommentsQuery)
}

function deleteComment(commentId) {
    fetchFromApi(queries.deleteCommentMutation, {commentId})
}

function addComment(comment) {
    fetchFromApi(queries.addCommentMutation, {comment})
}

function updateComment(id, text, likes, author) {
    fetchFromApi(queries.updateCommentMutation, {id, text, likes, author})
}

function addComments(comments) {
    fetchFromApi(queries.bulkInsertMutation, {comments})
}

function deleteComments(commentIds) {
    fetchFromApi(queries.deleteCommentsMutation, {commentIds})
}

// getAll();
// deleteComment("NWU0YzI0Njg2OWQ4ZmFiNTY3OTVkODY5");
// addComment({text: "This is a JSC comm", likes: 10, author: "a"});
// updateComment("NWU1Yjk5M2UwZDJjZTA0YTUyYjQ4YmMw", "This is an updated JSC comm", 100, "a");
// const comments = [
//     {
//         text: "This is the first JSC bulk mutation comm",
//         likes: 10,
//         author: "ale"
//     },
//     {
//         text: "This is the second JSC bulk mutation comm",
//         likes: 10,
//         author: "ale"
//     },
//     {
//         text: "This is the third JSC bulk mutation comm",
//         likes: 10,
//         author: "ale"
//     }
// ];
// addComments(comments);
// deleteComments(["NWU1YmEyNWMzZTg5N2ExOGZjYjNiYTJk", "NWU1YmEyNWMzZTg5N2ExOGZjYjNiYTJl"]);
