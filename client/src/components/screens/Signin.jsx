import axios from 'axios'
import React, { useState , useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import {toast} from 'react-toastify'
toast.configure()

export default function Signin() {

    const {dispatch} = useContext(UserContext)

    const history = useHistory()

    const [personalData, setPersonalData] = useState({
         password: '', email: ''
    })
    const [error, setError] = useState("")

    //reset form
    let resetBtn = (e) => {
        e.preventDefault()
        setPersonalData({
            email: "",
            password: ""
        })
    }

    //saving user info
    let postData = (e) => {
        e.preventDefault()

        axios.post('/signin', personalData)
            .then(res => {
                localStorage.setItem("jwt",res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.savedUser))
                dispatch({ type: "USER", payload: res.data.savedUser})
                setError("")
                setPersonalData({  email: "", password: "" })
                history.push('/home')
                toast.success(res.data.message)
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data.message)
                toast.error(err.response.data.error)
            })
    }

    return (
        <div className="signup-container">
            <div className="row">
                <div className="col-md-3">
                    <h1 className="text-center">Photo Mania</h1>
                    
                </div>
                <div className="borderrt col-md-1"></div>
                <div className="form text-center col-md-7">
                    <h2><i className="fas fa-user-circle"></i></h2>
                    <h1>Log In</h1>
                    <form onSubmit={postData}>
                        <div>
                            <input type="text" placeholder="Email" value={personalData.email} onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })} />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" value={personalData.password} onChange={(e) => setPersonalData({ ...personalData, password: e.target.value })} />
                        </div>
                        <span>{error}</span>
                        <div>
                            <button type="submit">Submit</button>
                            <button onClick={resetBtn}>Reset</button>
                        </div>
                        <Link className="signinLink" to="/signup">New User? Sign In here</Link> 
                     
                    </form>
                </div>
            </div>
        </div>

    )
}
