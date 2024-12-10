import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
          <h3>You are Atuhorized {}</h3>
          <button className='btn btn-danger'>Logout</button>
        </div>
        :
        <div>
          <h3>{}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
      } 
    </div>
  )
}

export default Home