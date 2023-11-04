import React from 'react'
import "./CreatePost.css"
import { Formik , Form ,Field , ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Register() {
    const initialValues = {
        password:"",
        username:""
    }
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6).required(),
        username:Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/users",data).then(response=>{
            navigate("/createpost")
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
                <label htmlFor="title" className="label">Username</label>
                <ErrorMessage name='postText' component='span'/>
                <Field
                    autoComplete="off" 
                    className="input"
                    name="username"
                    placeholder="(Ex: Username ...)"
                />
                <label htmlFor="title" className="label">Password</label>
                <ErrorMessage name='username' component='span'/>
                <Field
                    autoComplete="off" 
                    className="input"
                    name="password"
                    type="password"
                    placeholder="(Ex: Password..)"
                />

                <button className="btn" type='submit'>Register</button>
            </Form>
        </Formik>
    </div>

  )
}

export default Register