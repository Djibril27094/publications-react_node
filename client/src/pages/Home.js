import React from 'react'
import axios from "axios"
import  "../App.css";
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [listOfPosts, setlistOfPosts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      axios.get("http://localhost:3001/posts")
      .then(response => {
        setlistOfPosts(response.data)
      })
    }, []);

  return (
    <div className="App">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className='post' onClick={()=> {
              navigate("/post/"+value.id)
            }}>
              <div className="title">{value.title}</div>
              <div className="body">{value.postText}</div>
              <div className="footer">{value.username}</div>
            </div>
          )
        })}
    </div>

  );
}

export default Home;
