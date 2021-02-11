import React from 'react'
import { Link } from 'react-router-dom'
import social from '../images/social.png'

export default function LandingPage() {
    return (
        <div className="landingpage">
            <div className="bimg1">
                <div className="header">
                    <div className="circle">
                        <h1>P</h1>
                    </div>
                    <h3>Introducing Photomania</h3>
                </div>
            </div>

            <div className="mid-section">
                <div className="row">
                    <div className="col-md-5">
                        <img src={social} alt="social-media"/>
                    </div>
                    <div className="col-md-7 quote">
                        <h1>Every moment is precious so</h1>
                        <div className="box b1">Post Your <span>moment.</span></div>
                        <div className="box b2">experience it <span>again.</span></div>
                    </div>
                </div>
            </div>

            <div className="bimg2">
                <h1 className="heading">Features</h1>
                <div className="card-container">
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-heart"></i>
                        </div>
                        <div className="body">
                            <h3>Show them love by giving like to there posts.</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="body">
                            <h3>Find out other users quickly using search option.</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-id-badge"></i>
                        </div>
                        <div className="body">
                            <h3>Watch all posts posted by our friends by simply visiting their profile.</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="body">
                            <h3>Follow other users to see their feed on my following section.</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-globe"></i>
                        </div>
                        <div className="body">
                            <h3>Explore all posts of existing users without following them.</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="title">
                            <i className="fas fa-comments"></i>
                        </div>
                        <div className="body">
                            <h3>Add comments to the posts and show them how you feel about it.</h3>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bottom-heading">
                <h1>Give it a look</h1>
            </div>
            <div className="bimg3">
                <div className="bottom-container">
                        <div className="mobile-outlet">
                            <div className="horizontal-line"></div>
                            <div className="mobile-screen">
                                <h6 style={{margin:"10px"}}>Cary Frost</h6>
                                <hr/>
                                <img src="https://picsum.photos/200" alt="img"/>
                                <div style={{display:"flex",width:"40%",margin:"10px",height:"10px"}}>
                                    <i className="fas fa-heart" style={{color:"red",fontSize:"1.2rem"}}>40</i>
                                    <i className="fas fa-comments" style={{color:"blue",fontSize:"1.2rem",marginLeft:"10px"}}> 1 </i>
                                </div>
                                <hr/>
                                <p><span style={{color:"purple",marginTop:"5px"}}>Nicolas Adams : </span>Nice pic</p>
                              
                            </div>
                            <div className="black-circle"></div>
                        </div>
                        <div className="bottom-link">
                            <Link className="home-link" to="/home">get started</Link> 
                        </div>
                </div>
            </div>
        </div>

    )
}

