export const gqlUrl = 'http://localhost:8000/graphql';

export const getCommentsQuery = `query Comments{ 
  comments{
      text
      id
      timestamp
      author
      likes
  }
}`;

export const getCommentQuery = `query Comment($commentId: ID!){ 
  comment(commentId: $commentId){
      text
      id
      timestamp
      author
      likes
  }
}`;

export const deleteCommentMutation = `mutation DeleteComment($commentId: ID!){ 
    deleteComment(commentId: $commentId)
}`;

export const addCommentMutation = `mutation AddComment($comment: CommentDataInput!){ 
    addComment(comment: $comment)
}`;

export const updateCommentMutation = `mutation UpdateComment($id: ID!, $text: String!, $likes: Int!, $author: String!){ 
    updateComment(id: $id, text: $text, likes: $likes, author: $author)
}`;

export const bulkInsertCommentsMutation = `mutation AddComments($comments: [CommentDataInput]!){ 
    addComments(comments: $comments)
}`;

export const deleteCommentsMutation = `mutation DeleteComments($commentIds: [ID]!){ 
    deleteComments(commentIds: $commentIds)
}`;

export const clearCommentsMutation = `mutation{
  clearComments
}`;

export const getAllPostsQuery = `query Posts{ 
  posts{
      id
      text
      timestamp
      author
      likes
      deleted
      comments {
          id
          text
          timestamp
          author
          likes
      }
  }
}`;

export const getAllPostsSmallQuery = `query Posts{ 
  posts{
      id
      text
  }
}`;

export const clearPostsMutation = `mutation{
  clearPosts
}`;

export const bulkInsertPostsMutation = `mutation AddPosts($posts: [PostDataInput]!){ 
    addPosts(posts: $posts)
}`;

export const addPostMutation = `mutation AddPost($post: PostDataInput!){ 
    addPost(post: $post)
}`;

export const updatePostCommentMutation = `mutation updatePostComment($postId: ID!, $commentId: ID!, $text: String!, $likes: Int!, $author: String!){ 
    updatePostComment(postId: $postId, commentId: $commentId, text: $text, likes: $likes, author: $author)
}`;
