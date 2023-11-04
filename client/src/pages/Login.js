import axios from 'axios';
import React, { useContext,useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const {setauthState} = useContext(AuthContext)

  const navigate = useNavigate()
  const onSubmit = ()=> {
    const data = {username:username ,password:password}
    axios.post("http://localhost:3001/auth/users/login",data)
    .then(response => {
      if (response.data.error) {
        alert (response.data.error)
      }else {
        localStorage.setItem("accessToken" , response.data.token)
        setauthState({
          username:response.data.username,
          id:response.data.id,
          status:true
        })
        navigate("/")
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
       <div className='form'>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className='form-control' 
            value={username} 
            autoComplete='off'
            onChange={even => setusername(even.target.value)} 
          />
       </div>
       <div className='form'>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className='form-control'
            autoComplete='off'
            value={password}
            onChange={even=> setpassword(even.target.value)}  
          />
       </div>
       <button onClick={onSubmit}>Login</button>
    </div>
  )
}

export default Login