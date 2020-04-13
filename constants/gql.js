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

const getCommentQuery = `query Comment($commentId: ID!){ 
  comment(commentId: $commentId){
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

const bulkInsertCommentsMutation = `mutation AddComments($comments: [CommentDataInput]!){ 
    addComments(comments: $comments)
}`;

const deleteCommentsMutation = `mutation DeleteComments($commentIds: [ID]!){ 
    deleteComments(commentIds: $commentIds)
}`;

const clearCommentsMutation = `mutation{
  clearComments
}`;

const getAllPostsQuery = `query Posts{ 
  posts{
      id
      text
  }
}`;

const clearPostsMutation = `mutation{
  clearPosts
}`;

const bulkInsertPostsMutation = `mutation AddPosts($posts: [PostDataInput]!){ 
    addPosts(posts: $posts)
}`;

const addPostMutation = `mutation AddPost($post: PostDataInput!){ 
    addPost(post: $post)
}`;

const updatePostCommentMutation = `mutation updatePostComment($postId: ID!, $commentId: ID!, $text: String!, $likes: Int!, $author: String!){ 
    updatePostComment(postId: $postId, commentId: $commentId, text: $text, likes: $likes, author: $author)
}`;

module.exports = Object.freeze({
    gqlUrl,
    getCommentsQuery,
    deleteCommentMutation,
    addCommentMutation,
    updateCommentMutation,
    bulkInsertCommentsMutation,
    deleteCommentsMutation,
    clearCommentsMutation,
    getCommentQuery,
    getAllPostsQuery,
    clearPostsMutation,
    bulkInsertPostsMutation,
    addPostMutation,
    updatePostCommentMutation
});