import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [values, setValues] = useState({email: '', password: ''});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        // event.preventDefault() ile form'daki button'a tıklandığında sayfanın yenilenmesini engellemiş olduk
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            console.log("res on server = ", res)
            if(res.data.Status === "Success") {
                navigate('/')
            } else {
                alert("Login Failed: " + res.data.Error);
                // console.log("res mail = ", res.data.recordsets[0][0].name);
                console.log("res email = ", res);
            }
        })
        .then(err => {console.log("if there is err = ", err);});

        console.log("values =", values);
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-50'>
            <h2>Sign-Up</h2>
            <form onSubmit={handleSubmit}>
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
                <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                <p>You are agree to aour terms and policies</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login