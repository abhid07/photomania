import axios from 'axios'
import React,{useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'
toast.configure()

export default function Signup() {

    const history = useHistory() 

    const [personalData,setPersonalData] = useState({
        name:'', password:'', email:''
    })
    const [error,setError] = useState({
        nameErr:'',passwordErr:'',emailErr:'' 
    })

    //reset form
    let resetBtn = (e)=>{
        e.preventDefault()
        setPersonalData({
            name:"",
            email:"",
            password:""
        })
    }

    //saving user info
    let postData = (e) =>{
        e.preventDefault()
        
        //cheking name
        if(personalData.name.length<=4)
        {
            return setError({ nameErr:"Name is too short" })
        }

        //checking email
        if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(personalData.email)) {
            return setError({ emailErr: "Email is not valid" })
        }

        //checking password
        if (personalData.password.length < 8) {
            return setError({ passwordErr: "Password must contain 8 characters" })
        }
        
            axios.post('/signup',personalData)
            
            .then(res=>{
                console.log(res);
                setError({emailErr:"",passwordErr:"",nameErr:""})
                setPersonalData({name:"",email:"",password:""})
                history.push('/signin')
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data.error)
                setError({ emailErr: "", passwordErr: "", nameErr: "" })
            })
    }

    return (
        <div className="signup-container">
            {console.log(personalData)}
                <div className="row">
                    <div className="col-md-3">
                        <h1 className="text-center">Photo Mania</h1>
                    </div>
                    <div className="borderrt col-md-1"></div>
                    <div className="form text-center col-md-7">
                    <h2><i className="fas fa-users"></i></h2>
                        <h1>Signup</h1>
                        <form onSubmit={postData}>
                            <div>
                            <input type="text" placeholder="Name" value={personalData.name} onChange={(e) => setPersonalData({...personalData,name:e.target.value.toUpperCase()})}/>
                            </div>
                            <span>{error.nameErr}</span>
                            <div>
                            <input type="text" placeholder="Email" value={personalData.email} onChange={(e) => setPersonalData({...personalData,email:e.target.value})} />
                            </div>
                            <span>{error.emailErr}</span>
                            <div>
                            <input type="password" placeholder="Password" value={personalData.password} onChange={(e) => setPersonalData({...personalData,password:e.target.value})} />    
                            </div>
                            <span>{error.passwordErr}</span>
                            <div>
                                <button type="submit">Submit</button>
                                <button onClick={resetBtn}>Reset</button>
                            </div>
                            <Link className="signinLink" to="/signin">Already have an account?</Link>
                        </form>
                    </div>
                </div>
        </div>
         
    )
}
