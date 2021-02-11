import axios from 'axios'
import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import camera from '../images/camera.png'
import {toast} from 'react-toastify'
toast.configure()

export default function Navbar() {
    const {state,dispatch} = useContext(UserContext)
    const [search, setSearch] = useState("")   
    const [userDetails, setUserDetails] = useState([])
    

    const renderList = ()=>{
        if(state)
        {
            return[
                <button key="1" className="nav-link"><i className="fas fa-search" data-bs-toggle="modal" data-bs-target="#searchModal"></i></button>,
                <Link to="/home" key="2" className="nav-link"><i className="fas fa-home"></i></Link>,
                <Link to="/profile" key="3" className="nav-link"><i className="fas fa-user-circle"></i></Link>,
                <Link to="/createpost" key="4" className="nav-link"><i className="fas fa-plus-circle"></i></Link>,
                <Link to={`/update-user/${state._id}`} key="5" className="nav-link"><i className="fas fa-cog"></i></Link>,
                <Link to="/signin" key="6" className="nav-link" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    toast.success("Logged Out Successfully")
                }}>
                <i className="fas fa-sign-out-alt"></i>
                </Link>
            ]
        }
        else
        {
            return[
                <Link to="/signin" key="7" className="nav-link"><i className="fas fa-sign-in-alt"></i></Link>,
                <Link to="/signup" key="8" className="nav-link"><i className="fas fa-user-plus"></i></Link>
            ]
        }
    }

    let searchUser=(query)=>{
        setSearch(query)
        let data ={
            query:search
        }
        axios('/search-user',{
            method:"post",
            data:data
        })
        .then(res=>{
            console.log(res.data)
            setUserDetails(res.data)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to={state?"/":"/signin"} className="navbar-brand"><img src={camera} alt="logo"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {renderList()}
                        </div>
                    </div>
                </div>
            </nav>
            {/* Modal */}
            <div className="modal fade " id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" placeholder="Search Account" value={search} onChange={(e)=>searchUser(e.target.value.toUpperCase())}/>

                            <ul className="list-group">
                                {userDetails.map(user=>{
                                    
                                    return(
                                    (search) ?
                                        <div key={user._id}>
                                            <Link className="link" to={(user._id!==state._id)?`/profile/${user._id}`:`/profile`}>
                                            <li className="list-group-item" onClick>
                                            <div className="search-div">
                                                <div>
                                                    <img src={user.profilepic} style={{width:"50px",height:"50px",borderRadius:"90px"}} alt="profile pic"/>
                                                    <h5>{user.name}</h5>
                                                </div>
                                                <p>{user.email}</p>
                                            </div>
                                            </li>
                                            </Link>
                                        </div>
                                    : <></>
                                    )
                                  
                                })}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setSearch("")}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
