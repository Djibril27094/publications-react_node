import React , {Fragment, useEffect, useState} from 'react'
import "./App.css"
import { BrowserRouter as Router , Routes, Route,Link } from "react-router-dom";
import Home  from "./pages/Home";
import CreatePost from "./pages/CreatePost"
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';
const initialStateAuth = {
  username:"",
  id:0,
  status: false
}
const App = () => {

  const [authState, setauthState] = useState(initialStateAuth);  
  
  useEffect(()=> {
    axios.get(`http://localhost:3001/auth/users/auth`,
    {
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then(response => {
      console.log(response.data);
      if (response.data.error) {
        setauthState(initialStateAuth)
      }else{
        setauthState({
          username:response.data.username,
          id: response.data.id,
          status: true
        })
      }
    }).catch(err=> {
      console.log(err);
    })
    
  })
  const logout = ()=> {
    setauthState(false)
    localStorage.removeItem("accessToken")
  }
  return (
    <Router>
      <AuthContext.Provider value={{authState, setauthState}}>
      <div className="App">
        <div className="navbar" >
          <Link to="/" className="item">Home page</Link>
          <Link to="/createpost" className="item">Create A post</Link>
          {!authState.status ?(
          <Fragment>
            <Link to="/login" className="item">Login</Link>
            <Link to="/registration" className="item">Registration</Link>
          </Fragment>
          ): (
            <button onClick={logout}>Logout</button>
          )
        }
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/createpost" element={<CreatePost />}/>
          <Route path='/post/:post_id' element={<Post />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registration' element={<Register />}/>
        </Routes>
      </div>
      </AuthContext.Provider>
    </Router>
  )
}

export default App