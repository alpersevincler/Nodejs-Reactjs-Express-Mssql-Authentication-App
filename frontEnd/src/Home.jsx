import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Home() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    axios.get('/')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true)
        setName(res.data.name)
        navigate('/login')
      }else {
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .then(err => console.log(err));
  }, [])

  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
          <h3>You are Atuhorized - {name}</h3>
          <button className='btn btn-danger'>Logout</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
      } 
    </div>
  )
}

export default Home