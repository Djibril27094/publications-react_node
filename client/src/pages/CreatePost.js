import React from 'react'
import "./CreatePost.css"
import { Formik , Form ,Field , ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function CreatePost() {
    const initialValues = {
        title:"",
        postText:"",
        username:""
    }
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username:Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts",data).then(response=>{
            navigate("/")
        })
    }
  return (
    <div className="form">
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <label htmlFor="title" className="label">Title</label>
                <ErrorMessage name='title' component='span'/>
                <Field 
                    autoComplete="off"
                    className="input"
                    name="title"
                    placeholder="(Ex: title..)"                   
                />
                <label htmlFor="title" className="label">Post</label>
                <ErrorMessage name='postText' component='span'/>
                <Field
                    autoComplete="off" 
                    className="input"
                    name="postText"
                    placeholder="(Ex: Post ...)"
                />
                <label htmlFor="title" className="label">Username</label>
                <ErrorMessage name='username' component='span'/>
                <Field
                    autoComplete="off" 
                    className="input"
                    name="username"
                    placeholder="(Ex: username..)"
                />

                <button className="btn" type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>

  )
}

export default CreatePost