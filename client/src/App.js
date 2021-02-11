import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router ,  Route, Switch , useHistory } from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import React,{ createContext, useEffect , useReducer, useContext} from 'react';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile';
import MyFollowingPost from './components/screens/MyFollowingPost';
import Footer from './components/Footer'
import UpdateUser from './components/screens/UpdateUser'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './components/LandingPage';

export const UserContext = createContext()


const Routing=()=>{
  let history = useHistory()
  const { dispatch } = useContext(UserContext)
   
  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      
      if(user)
      {
        dispatch({type:"USER", payload:user})
      }
      else
      {
        history.push('/signin')
      }
  },[])

  return(
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/followingpost">
        <MyFollowingPost/>
      </Route>
      <Route path="/update-user/:id">
        <UpdateUser/>
      </Route>
    </Switch>
  )

}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <Route exact path="/">
        <LandingPage/>
      </Route>
        <Route path={["/home", "/signin","/signup","/profile","/createpost","/followingpost","/update-user/:id","/profile/:userid"]}>
        <div className="main-container"> 
        <Navbar/>
        <Routing/>
        </div>
        <Footer/>
      </Route>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
