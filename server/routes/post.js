const express = require('express');
const { createPost, allpost, followingPost, mypost, like, dislike, comments, deleteComment, deletePost } = require('../controller/postController');
const router = express.Router()
const requireLogin = require('../middleWare/requireLogin')


//getting all posts
router.get('/allpost',requireLogin,allpost)

//getting posts of users whom i follow
router.get('/followingpost',requireLogin,followingPost)

//creating post
router.post('/createpost',requireLogin,createPost)

//getting all the post created by user
router.get('/mypost',requireLogin,mypost)

//getting likes
router.put('/like',requireLogin,like)

//getting dislikes
router.put('/dislike',requireLogin,dislike)

//posting comments
router.put('/comment',requireLogin,comments)

//deleting comments
router.put('/delcomment',requireLogin,deleteComment)

//deleting post
router.delete('/deletepost/:postId',requireLogin,deletePost)



module.exports=router