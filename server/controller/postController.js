const Post = require('../model/Posts');


//displaying all posts
exports.allpost = ((req, res) => {
    var sortPost = {createdAt:-1}
    Post.find()
        .populate('postedBy', "_id name")
        .populate("comments.postedBy", "_id name")
        .sort(sortPost)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            console.log(err);
        })
})

//dispaying posts of user whom i follow

exports.followingPost = ((req, res) => {
    var sortPost = { createdAt: -1 }
    Post.find({postedBy:{$in:req.user.following}})
        .populate('postedBy', "_id name")
        .populate('comments.postedBy',"_id name")
        .sort(sortPost)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            console.log(err);
        })
})



//creating new post
exports.createPost = ((req, res) => {
    const { title, body, photo } = req.body

    if (!title || !body || !photo) {
        return res.status(422).json({ error: "Please provide necessary fields" })
    }
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user
    })
    post.save()
        .then(result => {
            res.json({ post: result , message:"Post created Successfully"})
        })
        .catch(error => console.log(error))
})

//list all the post created by user

exports.mypost = ((req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => console.log(err))
})

//updating likes for post

exports.like = ((req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name").exec((err, likes) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.send(likes)
            }
        })
})

exports.dislike = ((req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name").exec((err, dislike) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.send(dislike)
            }
        })
})

//posting comments 

exports.comments = ((req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .populate('postedBy', "_id name")
        .exec((err, comment) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(comment)
            }
        })
})

exports.deleteComment = (req, res) => {

    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { comments: { _id: req.body.commentId } }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name").exec((err, comment) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.send(comment)
            }
        })
}

//deleting post

exports.deletePost = (req, res) => {
    Post.findOne({ "_id": req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err) {
                res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
}


