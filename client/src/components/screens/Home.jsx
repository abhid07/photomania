import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import RingLoader from "react-spinners/RingLoader";
toast.configure()

export default function Home() {

    const { state } = useContext(UserContext)
    const [comment, setComment] = useState("")
    const [post, setPost] = useState([])
    let color = "red"
    useEffect(() => {

        // getting all posts

        axios('/allpost', {
            method: "get",
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        }).then(res => {
            console.log(res.data);
            setPost(res.data.post)
        }).catch(err => {
            console.log(err);
        })
    }, [])


    let likePost = (id) => {

        let data = {
            postId: id
        }
        axios('/like', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('jwt')
            },
            data: data
        })
            .then(res => {
                console.log(res)
                let newPost = post.map(item => {
                    if (item._id === res.data._id) {
                        return res.data
                    }
                    else {
                        return item
                    }
                })
                setPost(newPost)
            })
            .catch(err => console.log(err))
    }

    //dislike the post

    let disLikePost = (id) => {
        let data = {
            postId: id
        }
        axios('/dislike', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('jwt')
            },
            data: data
        })
            .then(res => {
                let newPost = post.map(item => {
                    if (item._id === res.data._id) {
                        return res.data
                    }
                    else {
                        return item
                    }
                })
                setPost(newPost)
            })
            .catch(err => console.log(err))
    }

    //add comment

    const addComment = (text, id) => {
        document.forms[id].reset()
        const data = {
            text,
            postId: id
        }
        axios('/comment', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("jwt")
            },
            data: data
        }).then(res => {
            let newPost = post.map(item => {
                if (item._id === res.data._id) {
                    return res.data
                }
                else {
                    return item
                }
            })
            setPost(newPost)
            console.log(res.data);
        })
            .catch(err => console.log(err))
    }

    //delete comment

    let deleteComment = (id, commentId) => {
        let data = {
            postId: id,
            commentId: commentId
        }
        axios('/delcomment', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('jwt')
            },
            data: data
        })
            .then(res => {
                let newPost = post.map(item => {
                    if (item._id === res.data._id) {
                        console.log(res);
                        return res.data
                    }
                    else {
                        return item
                    }
                })
                setPost(newPost)
            })
            .catch(err => console.log(err))
    }
    //deletepost
    let deletePost = (postId) => {
        axios(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => {
                console.log(res.data)
                toast.success("Post deleted")
                const newPost = post.filter(item => {
                    return item._id !== res.data._id
                })
                setPost(newPost)
            })
            .catch(err => {
                console.log(err);
            })
    }
    //renderpost
    let renderPost = () => {
        return (
            post.map(item => {
                return (
                    item.postedBy ?
                        <div className="card" key={item._id}>
                            <div className="card-top">
                            
                                <Link className="link" to={(item.postedBy._id !== state._id) ? `/profile/${item.postedBy._id}` : `/profile`}><h5>{item.postedBy.name}</h5></Link>
                                {(item.postedBy._id === state._id) &&
                                    <i className="fas fa-trash" onClick={() => deletePost(item._id)}> </i>
                                }
                            
                            </div>
                            <hr/>
                            <img src={item.photo} alt="post" />
                            <div className="like-container">
                                <div className="like">
                                    {(state) ?
                                        (item.likes.includes(state._id)) ?
                                            <i className="fas fa-heart" onClick={() => disLikePost(item._id)}></i>
                                            :
                                            <i className="far fa-heart" onClick={() => likePost(item._id)}></i>
                                        : "loading"
                                    }
                                    <h2 style={{ marginLeft: "5px" }}>{item.likes.length}</h2>
                                    <i className="fas fa-comments" style={{ color: "blue", marginLeft: "10px" }}></i>
                                    <h2 style={{ marginLeft: "5px" }}>{item.comments.length}</h2>
                                </div>
                                <div className="moment"><h6>{moment(item.createdAt).fromNow()}</h6></div>
                            </div>
                            <hr />
                            <div className="card-body">

                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.body}</p>

                                <div className="comments-container" style={item.comments.length > 1 ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                                    {
                                        item.comments.map(val => {
                                            return (
                                                <>
                                                    <div className="comments">
                                                        {
                                                            (val.postedBy) ?
                                                                <div className="comment-display" key={val._id}>
                                                                    <h6><span>{val.postedBy.name} : </span>{val.text}</h6>
                                                                    {
                                                                        (state) ?
                                                                            (state._id === val.postedBy._id || state._id === item.postedBy._id) ?
                                                                                <div className="trash">
                                                                                    <i className="fas fa-trash" onClick={() => deleteComment(item._id, val._id)}></i>
                                                                                </div>
                                                                                :
                                                                                <></>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </div>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                </>
                                            )

                                        })
                                    }
                                </div>

                                <form className="comment-form" name={item._id}>
                                    <input type="text" placeholder="Add a comment" onChange={(e) => setComment(e.currentTarget.value)} />
                                    <div className="submit"><i className="fas fa-paper-plane" onClick={(e) => {
                                        e.preventDefault()
                                        addComment(comment, item._id)
                                    }}></i></div>
                                </form>
                            </div>
                        </div> : <></>
                )
            })
        )
    }

    return (
        <>
            <div className="allpost-container">
                {
                (post.length > 0) ?
                    renderPost()
                    :
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <RingLoader color={color} size={200} />
                    </div>
                }
            </div>
        </>

    )
}
// Throw user to home after login