const gqlUrl = 'http://localhost:8000/graphql';
const getCommentsQuery = `query Comments{ 
  comments{
      text
      id
      timestamp
      author
      likes
  }
}`;
const deleteCommentMutation = `mutation DeleteComment($commentId: ID!){ 
    deleteComment(commentId: $commentId)
}`;
const addCommentMutation = `mutation AddComment($comment: CommentDataInput!){ 
    addComment(comment: $comment)
}`;
const updateCommentMutation = `mutation UpdateComment($id: ID!, $text: String!, $likes: Int!, $author: String!){ 
    updateComment(id: $id, text: $text, likes: $likes, author: $author)
}`;
const bulkInsertMutation = `mutation AddComments($comments: [CommentDataInput]!){ 
    addComments(comments: $comments)
}`;
const deleteCommentsMutation = `mutation DeleteComments($commentIds: [ID]!){ 
    deleteComments(commentIds: $commentIds)
}`;

const clearMutation = `mutation{
  clear
}`;

module.exports = Object.freeze({
    gqlUrl,
    getCommentsQuery,
    deleteCommentMutation,
    addCommentMutation,
    updateCommentMutation,
    bulkInsertMutation,
    deleteCommentsMutation,
    clearMutation
});