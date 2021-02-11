import React , {useState , useContext}from 'react'
import axios from 'axios'
import {UserContext} from '../../App'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
toast.configure()

export default function UpdateUser() {
    const {dispatch} = useContext(UserContext)
    const { id } = useParams()
    const [updateInfo, setUpdateInfo] = useState({
        email:"",oldpassword:"",password:""
    })
    
    let updateUserInfo=(e)=>{
        e.preventDefault()
        axios.put(`/update-user/${id}`,updateInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.error)
            {
                toast.error(res.data.error)
                setUpdateInfo({
                     email: "", oldpassword: "", password: ""
                })
            }
            else
            {
                toast.success("User Details Updated")
                console.log(res.data)
                dispatch({ type: "USER", payload: res.data})
                localStorage.setItem('user', JSON.stringify(res.data))
                setUpdateInfo({
                  email: "", oldpassword: "", password: ""
                })
            }
        })
        .catch(err=>{
            console.log(err)
            
        })
    }

    return (
        <>
        <div className="updateuser-container">
            <div className="row">
                <div className="col-md-5">
                    <h1>Update Details</h1>
                </div>
                <div className="col-md-7">
                    <form onSubmit={updateUserInfo}>
                        <input type="email" placeholder="email" value={updateInfo.email} onChange={(e) => setUpdateInfo({ ...updateInfo, email: e.target.value })} />
                        <span>Leave email field blank if you dont want to update.</span>
                        <input type="password" placeholder="Old Password" value={updateInfo.oldpassword} onChange={(e) => setUpdateInfo({ ...updateInfo, oldpassword: e.target.value })} />
                        <input type="password" placeholder="New password" minLength="8" value={updateInfo.password} onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
                
               
           
        </div>
        </>
    )
}
