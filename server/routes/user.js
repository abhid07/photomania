const express = require('express');
const { user, follow, unfollow, uploadPic, searchUser , updateUser} = require('../controller/userController');
const router = express.Router()
const requireLogin = require('../middleWare/requireLogin')


//getting other user profile
router.get('/user/:id',requireLogin,user)

//following route
router.put('/follow',requireLogin,follow)

//follower route
router.put('/unfollow', requireLogin, unfollow)

//update profile pic 
router.put('/profilepic/:id',requireLogin,uploadPic)

//search users
router.post('/search-user',searchUser)

//update user details 
router.put('/update-user/:id',updateUser)

module.exports = router