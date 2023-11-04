import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Post.css"
import { AuthContext } from '../helpers/AuthContext';

function Post() {
  const {post_id} = useParams()
  const [postObject, setpostObject] = useState({});
  const [comments, setcomments] = useState([]);
  const [newcomment, setnewcomment] = useState('');
  const {authState} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=> {
    axios.get(`http://localhost:3001/posts/byId/${post_id}`)
    .then(response => {
      setpostObject(response.data)
    })
    
    axios.get(`http://localhost:3001/comments/${post_id}`,
    {
      headers: {
        accessToken:localStorage.getItem("accessToken")
      }
    })
    .then(response => {      
        setcomments(response.data)
    })
  },[post_id])
  const addComment = () => {
    axios.post(`http://localhost:3001/comments`,{
      commentBody:newcomment,
      PostId:post_id,
      username:""
    },
    {
      headers: {
        accessToken:localStorage.getItem("accessToken")
      }
    }

    ).then(response => {

      const commentAdd = {commentBody: newcomment , username:response.data.username}
      setcomments([...comments , commentAdd])
      setnewcomment('')
    }).catch(err => {
      console.log(err);
    })
  }
  const deleteComment = (id)=> {
    axios.delete(`http://localhost:3001/comments/${id}`,{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    })
    .then((res)=> {
      setcomments(
        comments.filter((val)=> {
          return val.id !== id
        })
      )
    })
  }
  return (
    <div className='postPage'>
      <div className="leftSide">
        <div className="title">{postObject.title}</div>
        <div className="postText">{postObject.postText}</div>
        <div className="username">{postObject.username}</div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input 
            type="text" 
            placeholder='Comment...' 
            autoComplete='off'
            value={newcomment}
            onChange={even => {
              setnewcomment(even.target.value)
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {
          comments.map((comment , key)=> {
              return (
                <div className='comment' key={key}>
                  {comment.commentBody} 
                  <label>Username: {comment.username}</label> 
                  {authState.username===comment.username && <button onClick={()=>deleteComment(comment.id)}>X</button>}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Post