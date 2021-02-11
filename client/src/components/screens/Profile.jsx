import axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from 'react-spinners/PropagateLoader'

toast.configure()



export default function Profile() {

    const [myposts, setMyposts] = useState([])
    const {state,dispatch} = useContext(UserContext) 
    const [image, setImage] = useState("")
    const [photo, setPhoto] = useState("")
    const [loadingmsg , setLoadingMsg] = useState("")
    const color = "red"
    const newcolor = "white"

    useEffect(() => {
        axios('/mypost',{
            method:"get",
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        })
        .then(res=>{
            // console.log (res.data.mypost)
            setMyposts(res.data.mypost)
            
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    //uploading profile pic url into database 
    useEffect(() => {
        if (photo) {
            let data = {
                profilepic:photo
            }
            setLoadingMsg("")
            console.log(data);
            axios(`/profilepic/${state._id}`, {
                method: "put",
                headers: { "Authorization": localStorage.getItem("jwt") },
                data: data
            })
                .then(res => {
                    console.log(res.data)
                    toast.success("Profile pic updated")
                    dispatch({ type: "UPDATEPIC", payload: { profilepic: res.data.profilepic} })
                    localStorage.setItem('user',JSON.stringify(res.data))
                    document.getElementById('profilepic').value=""
                })
                .catch(err => console.log(err.response.data))
        }
    }, [photo])


    //uploading profile pic into cloudinary

    let uploadPhoto = (e) => {
        e.preventDefault()
        setLoadingMsg("Woah 😍! its a nice pic. wait for few minutes. we are uploading it for you.")
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "photo-mania")
        data.append("cloud_name", "photo-mania")
        
        //uploading image in cloudinary

        axios.post("https://api.cloudinary.com/v1_1/photo-mania/image/upload", data)
            .then(res => {
                console.log(res.data.url)
                //setting cloudanary image url 
                setPhoto(res.data.url)
                
            })
            .catch(err => console.log(err))
    } 
 

    //render users posts

    let renderMyPosts = ()=>{
        return(
          myposts.map(post=>{
              return(
                <div className="singlepost" key={post._id}>
                    <img src={post.photo} alt="post" />
                    <button style={{}} onClick={()=>deletePost(post._id)}>Delete</button>
                </div>
              )
          })
        )
    }

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
                const newPost = myposts.filter(item => {
                    return item._id !== res.data._id
                })
                setMyposts(newPost)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {console.log(myposts)}
            <div className="profile-info">
                <div className="row">
                    <div className="col-md-6 dp">
                        <div className="circular--portrait">
                            <img src={state?state.profilepic:<></>} alt="user profile pic"/>
                        </div>
                        <div className="file">
                            <input className="form-control" type="file" id="profilepic" onChange={(e) => setImage(e.target.files[0])} required />
                        </div>
                        <h3 style={{ color: "red", textTransform: "capitalize",fontFamily: "Acme, sans-serif"}}>{loadingmsg}</h3>
                        {
                            (loadingmsg !== "") ? <div style={{marginBottom:"20px"}}><PropagateLoader color={newcolor} size={10} /></div>:<></>
                        }
                        <button onClick={uploadPhoto}>Submit</button>
                    </div>
                    <div className="col-md-6 user-info">
                        <Link to="/followingpost" className="link followingpost">My following post</Link>
                        <h3>{state?state.name:"Loading"}</h3>
                        <h4>{state?state.email:"Loading"}</h4>
                        <div className="counts">
                            <p>{(myposts)?myposts.length:<></>} Posts</p>
                            <p>{state?state.followers.length:0} Followers</p>
                            <p>{state?state.following.length:0} Following</p>   
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{color:"white",height:"100px"}}/>
            <div className="gallery">
                {
                    (myposts)?
                        (myposts.length>0)?
                            renderMyPosts()
                            :
                            <h1>You dont have any post yet</h1>   
                        :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RingLoader color={color} size={200} />
                        </div>                              
                }
            </div>
        </div>
    )
}
