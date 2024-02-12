import React from 'react'
import useAuthStore from './AuthStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [full_name, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {register} = useAuthStore()

    const save = (e) => {
        e.preventDefault()
        register({
            full_name: full_name,
            username: username,
            password: password
        })
        let token = localStorage.getItem('token')
        if(token){
            navigate('/signin')
        }
    }
  return (
    <div className='container d-flex justify-content-center'>
        <div className="card my-5" style={{width: "500px"}}>
            <div className="card-header">Sign Up</div>
            <div className="card-body">
                <form>
                    <input type="text" placeholder='Full_Name' onChange={(e) => setFullname(e.target.value)} className='form-control my-2' />
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='form-control my-2' />
                    <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='form-control my-2' />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={save} className='btn btn-primary'>Save</button>
            </div>
        </div>
    </div>
  )
}