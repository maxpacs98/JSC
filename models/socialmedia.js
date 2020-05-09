export class CommentInput {
    constructor(text, likes, author) {
        this.text = text;
        this.likes = likes;
        this.author = author;
    }
}

export class Comment extends CommentInput {
    constructor(id, text, likes, author, timestamp) {
        super(text, likes, author);
        this._id = id;
        this._timestamp = timestamp;
    }

    get timestamp() {
        return this._timestamp;
    }

    get id() {
        return this._id;
    }

    set id(newId) {
        this._id = newId;
    }
}

export class PostInput {
    constructor(text, likes, author, deleted, comments) {
        this.text = text;
        this.likes = likes;
        this.author = author;
        this.deleted = deleted;
        this.commentsInput = comments;
    }
}