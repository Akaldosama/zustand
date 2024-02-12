import React from 'react'
import useAuthStore from './AuthStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {login} = useAuthStore()

    const save = async (e) => {
        e.preventDefault();
        await login({
            username: username,
            password: password
        })
        let token = localStorage.getItem('token')
        if(token){
            navigate('/authors')
        }
    }
  return (
    <div className='conatiner d-flex justify-content-center'>
        <div className="card my-5" style={{width: "500px"}}>
            <div className="card-header">Sign in</div>
            <div className="card-body">
                <form>
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
