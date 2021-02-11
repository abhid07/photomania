import axios from 'axios'
import React,{useState , useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
toast.configure()

export default function CreatePost() {
    const history = useHistory()
    
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [photo,setPhoto] = useState("")

    //sending data into databse

    useEffect(() => {
        if(photo)
        {
            let data={
                title,body,photo
            }
            console.log(data);
            axios('/createpost',{
                method:"post",
                headers:{ "Authorization": localStorage.getItem("jwt")},
                data:data
            })
            .then(res=>{
                    toast.success(res.data.message)
                    history.push("/home")
                    
                })
            .catch(err=>console.log(err.response.data))
        }
    }, [photo])

    
    let postDetails = (e)=>{
        e.preventDefault()
        
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","photo-mania")
        data.append("cloud_name","photo-mania")

        //uploading image in cloudinary
        
            axios.post("https://api.cloudinary.com/v1_1/photo-mania/image/upload",data)
            .then(res=>{
                console.log(res.data.url)
                //setting cloudanary image url 
                setPhoto(res.data.url)
            })
            .catch(err=>console.log(err))
        
    } 
    return (
        <div className="createPost-container">
        {console.log(title,body,photo)}
            <div className="row">
                <div className="col-md-4 left-container">
                    <h1>Create</h1>
                    <h1>New</h1>
                    <h1>Post</h1>
                </div>
                <div className="col-md-1 borderrt"></div>
                <div className="form col-md-6 text-center">
                    <h1><i className="fas fa-plus-circle"></i></h1>
                    <form onSubmit={postDetails}>
                        <div>
                            <input type="text" className="form-control " placeholder="Title" onChange={(e)=>setTitle(e.target.value)} required/>
                        </div>
                        <div>
                            <input type="text" className="form-control" placeholder="Write a Message" onChange={(e) => setBody(e.target.value)} required/>
                        </div>
                        <div className="file">
                            <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} required/>
                        </div>
                        <div>
                            <button className="postSubmit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
