const Post = require('../model/Posts')
const User = require('../model/User')
const bcrypt = require('bcrypt');


//getting other users profile
exports.user = (req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,post)=>{
            if(err)
            {
                return res.status(422).json(err)
            }
            res.json({user,post})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}

//follow route

exports.follow=(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },
    {
        new:true
    },(err,user)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },
        {
            new:true
        }).select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            res.status(422).json({error:err})
        })
    })
}
//Unfollow route
exports.unfollow = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }

        }, { new: true }).select("-password").then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })

    }
    )
}

//upload profile pic

exports.uploadPic = ((req,res)=>{
    const update = req.body
    User.findByIdAndUpdate({_id:req.params.id},update,{new:true})
        .then((profilepic)=>{
            res.send(profilepic)
        })
        .catch(err=>console.log(err))
    })

//search users

exports.searchUser = ((req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}})
    .select("-password")
    .then(user=>{
        res.json(user)
    })
    .catch(err=>{
        console.log(err)
    })
})

//update user details

exports.updateUser = ((req,res)=>{
    const newuser = {
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }
    if(req.body.email!='')
    {
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user)
            {
                return res.json({error:"Email id already existed"})
            }
            else
            {
            User.findById({_id:req.params.id})
            .then(user=>{
                if (bcrypt.compareSync(req.body.oldpassword, user.password))
                {
                   
                    User.findByIdAndUpdate({ _id: req.params.id }, newuser, { new: true })
                    .select("-password")
                    .then(updatedUser=>{    
                        res.json(updatedUser)
                    })
                    .catch(err=>res.json(err))
                }
                else
                {
                    res.json({error:"Old password dont match. please type correct password"})
                }
            }).catch(err=>res.json(err))
            }
        }).catch(err => res.json(err))
    }
    else
    {
        User.findById({ _id: req.params.id })
            .then(user => {
                let updateUser = {
                    email: user.email,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
                }
                if (bcrypt.compareSync(req.body.oldpassword, user.password)) {
                   
                    User.findByIdAndUpdate({ _id: req.params.id }, updateUser, { new: true })
                        .select("-password")
                        .then(updatedUser => {
                            res.json(updatedUser)
                        })
                        .catch(err => res.json(err))
                }
                else {
                    res.json({ error: "Old password dont match. please type correct password" })
                }
            }).catch(err => res.json(err))
    }
})
