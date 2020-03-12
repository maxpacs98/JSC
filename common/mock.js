const {CommentInput} = require('../models/socialmedia');
const faker = require("faker");

function generateComments(number) {
    let comments = [];
    for (let i = 0; i < number; i++) {
        let text = faker.lorem.text();
        let trimmed = text.length >= 255 ? text.substring(0, 250) : text;
        comments.push(new CommentInput(trimmed, faker.random.number(), faker.name.findName()));
    }
    return number === 1 ? comments[0] : comments
}

module.exports = Object.freeze({
    generateComments
});