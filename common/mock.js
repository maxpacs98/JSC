import { CommentInput, PostInput } from "../models/socialmedia.js";
// import faker from "../node_modules/faker.js";
// const {CommentInput, PostInput} = require('../models/socialmedia');
// const faker = require("faker");

export function generateComments(number) {
    let comments = [];
    for (let i = 0; i < number; i++) {
        const text = faker.lorem.text();
        const trimmed = text.length >= 255 ? text.substring(0, 250) : text;
        comments.push(new CommentInput(trimmed, faker.random.number(), faker.name.findName()));
    }
    return number === 1 ? comments[0] : comments
}

export function generatePosts(number) {
    let posts = [];
    for (let i = 0; i < number; i++) {
        const text = faker.lorem.text();
        const trimmed = text.length >= 255 ? text.substring(0, 250) : text;
        const comments = generateComments(20);
        posts.push(new PostInput(trimmed, faker.random.number(), faker.name.findName(), faker.random.boolean(),comments));
    }
    return number === 1 ? posts[0] : posts
}

// module.exports = Object.freeze({
//     generateComments,
//     generatePosts
// });