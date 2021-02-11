import axios from 'axios'
import React, { useEffect, useState ,useContext } from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from '../../App'
import RingLoader from "react-spinners/RingLoader";

export default function UserProfile() {
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [userProfile,setuserProfile] = useState(null)
    let color = "red"
   
    useEffect(() => {

        axios(`/user/${userid}`,{
            method:"get",
            headers:{
                "Authorization":localStorage.getItem('jwt')
            }
        })
        .then(res=>{
            console.log(res.data)
            setuserProfile(res.data)
        })
        .catch(err=>console.log(err))
    }, [userid])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":  localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setuserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
               
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                
                setuserProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                

            })
    }

    //render user posts

    let renderMyPosts = () => {
      
        return (
            userProfile.post.map(post => {
                return (
                    <div className="singlepost">
                        <img src={post.photo} alt="post" key={post._id} />
                    </div>
                )
            })
        )
    }

    return (
        <>
            {console.log(state)}
            {(userProfile)? 
            
            <div>   
                <div className="profile-info">
                    <div className="row">
                        <div className="col-md-6 dp">
                            <div className="circular--portrait">
                                <img src={userProfile.user.profilepic}alt="profilepic" />
                            </div>
                        </div>
                        <div className="col-md-6 user-info">
                            <h3>{userProfile.user.name}</h3>
                            <h4>{userProfile.user.email}</h4>
                            <div className="counts">
                                <p>{userProfile.post.length} post</p>
                                <p>{userProfile.user.followers.length} Followers</p>
                                <p>{userProfile.user.following.length} Following</p>
                            </div>
                           
                            {state?
                                    (userProfile.user.followers.includes(state._id))?
                                        <button onClick={unfollowUser}>Unfollow</button>
                                        :
                                        <button onClick={followUser}>Follow</button>
                                    :<></>
                            }
                        </div>
                    </div>
                </div>
                <hr style={{color:"white",height:"100px"}}/>
                <div className="gallery">
                        {
                                (userProfile.post.length > 0) ?
                                    renderMyPosts()
                                    :
                                    <h1>User dont have any post yet</h1>
                                    
                        }
                </div>
            </div>
                : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <RingLoader color={color} size={200} />
                </div> }
        </>
    )
}
