import * as queries from "../constants/gql.js";

async function fetchFromGqlApi(query, variables, timed) {
    const conf = {
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

export async function getAllCommentsGql(timed) {
    return await fetchFromGqlApi(queries.getCommentsQuery, null, timed)
}

export async function getOneCommentGql(commentId, timed) {
    return await fetchFromGqlApi(queries.getCommentQuery, {commentId}, timed)
}

export async function clearCommentsGql(timed) {
    return await fetchFromGqlApi(queries.clearCommentsMutation, null, timed)
}

export async function deleteCommentGql(commentId, timed) {
    return await fetchFromGqlApi(queries.deleteCommentMutation, {commentId}, timed)
}

export async function addCommentGql(comment, timed) {
    return await fetchFromGqlApi(queries.addCommentMutation, {comment}, timed)
}

export async function updateCommentGql(text, likes, author, id, timed) {
    return await fetchFromGqlApi(queries.updateCommentMutation, {id, text, likes, author}, timed)
}

export async function addCommentsGql(comments, timed) {
    return await fetchFromGqlApi(queries.bulkInsertCommentsMutation, {comments}, timed)
}

export async function deleteCommentsGql(commentIds, timed) {
    return await fetchFromGqlApi(queries.deleteCommentsMutation, {commentIds}, timed)
}

export async function getAllPostsGql(timed) {
    return await fetchFromGqlApi(queries.getAllPostsQuery, null, timed)
}

export async function clearPostsGql(timed) {
    return await fetchFromGqlApi(queries.clearPostsMutation, null, timed)
}

export async function addPostsGql(posts, timed) {
    return await fetchFromGqlApi(queries.bulkInsertPostsMutation, {posts}, timed)
}

export async function addPostGql(post, timed) {
    return await fetchFromGqlApi(queries.addPostMutation, {post}, timed)
}

export async function updatePostCommentGql(postId, commentId, text, author, likes, timed) {
    return await fetchFromGqlApi(queries.updatePostCommentMutation, {postId, commentId, text, author, likes}, timed)
}