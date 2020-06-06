import { restUrl } from "../constants/rest.js";


async function fetchFromRestApi(endpoint, method, data, timed) {
    /* Sends the corresponding query with variables to GQL api and times it if time is set to true */

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
    const result = await fetch(`${restUrl}/${endpoint}`, conf);
    const endTime = performance.now();
    if (timed === true) {
        return endTime - startTime;
    } else {
        return await result.json();
    }
}

/* Procedures to set the specific endpoint and params for sending to the be service*/
export async function getAllCommentsRest(timed) {
    return await fetchFromRestApi("comments", "GET", null, timed);
}

export async function getOneCommentRest(commentId, timed) {
    return await fetchFromRestApi(`comments/${commentId}`, "GET", null, timed);
}

export async function clearCommentsRest(timed) {
    return await fetchFromRestApi("comments/clear", "DELETE", null, timed);
}

export async function addCommentRest(comment, timed) {
    return await fetchFromRestApi("comments", "POST", comment, timed);
}

export async function deleteCommentRest(commentId, timed) {
    return await fetchFromRestApi(`comments/${commentId}`, "DELETE", null, timed);
}

export async function updateCommentRest(id, comment, timed) {
    return await fetchFromRestApi(`comments/${id}`, "PUT", comment, timed);
}

export async function addCommentsRest(comments, timed) {
    return await fetchFromRestApi(`comments/bulk`, "POST", comments, timed);
}

export async function deleteCommentsRest(commentIds, timed) {
    return await fetchFromRestApi(`comments/delete`, "DELETE", commentIds, timed);
}

// POSTS
export async function getAllPostsRest(timed) {
    return await fetchFromRestApi("posts", "GET", null, timed);
}

export async function clearPostsRest(timed) {
    return await fetchFromRestApi("posts/clear", "DELETE", null, timed);
}

export async function addPostsRest(posts, timed) {
    return await fetchFromRestApi(`posts/bulk`, "POST", posts, timed);
}

export async function addPostRest(post, timed) {
    return await fetchFromRestApi("posts", "POST", post, timed);
}

export async function updatePostCommentRest(postId, comment, timed) {
    return await fetchFromRestApi(`posts/${postId}`, "PUT", comment, timed);
}

export async function getOnePostRest(timed) {
    return await fetchFromRestApi(`posts/first/`, "GET", null, timed);
}