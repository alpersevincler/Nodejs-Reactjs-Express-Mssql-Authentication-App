import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    // return'ün altındaki inputlara değer girildğinde setValues fonk.u ile values objesinin içine değerler atanacak
    const [values, setValues] = useState({name: '', email: '', password: ''});
    // sayfa yönlendirmeleri için gereken bağımlılık
    const navigate = useNavigate();

    // formdaki button'a tıklandığında bu metot çalışacaktır
    const handleSubmit = (event) => {
        // event.preventDefault() ile form'daki button'a tıklandığında sayfanın yenilenmesini engellemiş olduk
        event.preventDefault();
        // axios ile verdiğimiz serverın çalışacağı linkle, server.js'deki app.post('/register') yapısı ile haberleşip values değerini req olarak server'a göndermiş olacağız
        // server.js'den gelen res cavabını alacağız ve bu res'in altındaki Status'un değeri "Success" ise useNavigate ile login sayfasına yönledirme yapmış olacağız
        //  -Gelen cevabın içeriği farklı ise sayfada Error on Register hatası uyarı olarak gösterilecek. Eğer post yapısı ile bağlantıda bir problem varsa oradan dönen
        //  -hata, tarayıcı konsoluna yazdırılacak
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
            {/* formdaki button'a tıklandığında onSubmit attribute'u ile yukarıda tanımladığımız handleSubmit metodu çalışacak */}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    {/* inputa değer girildiğinde onChange bunu e ile yakalayacak. yukarıda tanımlanmış setValues fonk. ile e'nin içindeki value'yu(girilen değeri),
                    yine yukarıda tanımlanan values(...values ile)'un içindeki name bilgisine set edecek(tanımlamış, göndermiş olacak) */}
                    <input type="text" placeholder='Enter Name' name='name'
                    onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>E-mail</strong></label>
                    {/* inputa değer girildiğinde onChange bunu e ile yakalayacak. yukarıda tanımlanmış setValues fonk. ile e'nin içindeki value'yu(girilen değeri),
                    yine yukarıda tanımlanan values(...values ile)'un içindeki email bilgisine set edecek(tanımlamış, göndermiş olacak) */}
                    <input type="email" placeholder='Enter E-mail' name='email'
                    onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    {/* inputa değer girildiğinde onChange bunu e ile yakalayacak. yukarıda tanımlanmış setValues fonk. ile e'nin içindeki value'yu(girilen değeri),
                    yine yukarıda tanımlanan values(...values ile)'un içindeki password bilgisine set edecek(tanımlamış, göndermiş olacak) */}
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