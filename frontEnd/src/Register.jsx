import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [values, setValues] = useState({name: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // event.preventDefault() ile form'daki button'a tıklandığında sayfanın yenilenmesini engellemiş olduk
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            console.log("res on server = ", res)
            if(res.data.Status === "Success") {
                navigate('/login')
            } else {
                alert("Error on Register");
            }
        })
        .then(err => {console.log("if there is err = ", err);});

        console.log("values ==", values);
    }

    console.log("register start")

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-50'>
            <h2>Sign-Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name'
                    onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>E-mail</strong></label>
                    <input type="email" placeholder='Enter E-mail' name='email'
                    onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' 
                    onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                <p>You are agree to aour terms and policies</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Register