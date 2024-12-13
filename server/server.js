// package.json dosyasındaki "type": "module" ifadesi sayesinde bu şekilde import edebiliyoruz. Diğer şekilde require()'ı kullanmamız gerekirdi
import express from 'express';
import mssql from 'mssql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = await mssql.connect({
    user: 'CodingWithAlper',
    password: '1234',
    server: 'LAPTOP-B5A8-PMD',
    database: 'SQL-Tutorial',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
    // ,"driver": "msnodesqlv8",
});

let queryClick = `SELECT * from login`;

let dataDB = await db.request().query(queryClick);

console.log("dataDB = ", dataDB.recordset);


// aşağıdaki app.get('/', verifyUser,...) yapısı tetiklendiğinde bu metodu çalıştıracak ve ('/') sayfası içinde cookies token bilgisinin de olduğu 
//  -objeler ve diziler silsilesi bulunan datayı bu metoda req(request) olarak göndermiş olacak
const verifyUser = (req, res, next) => {
    console.log("verify res = ", res.cookies);
    const token = req.cookies.token;
    console.log("verifyUser token = ", token);
    if(!token) {
        return res.json({Error: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"});
            }else {
                console.log("req.nam = ", req.name);
                req.name = decoded.name;
                console.log("decoded.nam = ", req.name);
                next();
            }
        })
    }
}

// Home.jsx'deki useEffect'in içindeki axios.get('http://localhost:8081') tanımı bu yapıyı tetikleyecek ve bu yapıda yukarıdaki verifyUser metodunu çalıştırıp
//  - Home.jsx'deki useEffect'e geri response(res.json) göndermiş olacacak
app.get('/', verifyUser, (req, res) => {
    console.log("app.get req = ", req.cookies);
    return res.json({Status: "Success", name: req.name});
})

app.post('/register', async(req, res) => {
    try{
        bcrypt.hash(req.body.password.toString(), salt, async (err, hash) => {
            if(err) return res.json({Error: "Error for hashing password"});

            const sql = `INSERT INTO login (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hash}')`;

            await db.request().query(sql, (err, result) => {
                if(err)
                    return res.json({Error: "Inserting data Error in server", err});
                return res.json({Status: "Success", result});
            });
        })
    }catch(error) {
        console.log("server sql error = ", error);
    }

    // const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";

    // bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    //     if(err) return res.json({Error: "Error for hassing password"});
    //     const values = [
    //         req.body.name,
    //         req.body.email,
    //         hash
    //     ]
    //     db.request().query(sql, [values], (err, result) => {
    //         if(err) return res.json({Error: "Inserting data Error in server"});
    //         return res.json({Status: "Success"});
    //     })
    // })
});


app.post('/login', async(req, res) => {

    try{
        let queryEmail = `SELECT * from login WHERE email = '${req.body.email}'`;
        let sql = await db.request().query(queryEmail);
        // console.log(sql.recordset[0].password);
        if(sql) {
            bcrypt.compare(req.body.password.toString(), sql.recordset[0].password, (err, response) => {
                if(err)
                    return res.json({Error: "Password compare error"});
                if(response) {
                    // sorgudan gelen cevabın içindeki name bilgisi
                    const name = sql.recordset[0].name;
                    // jsonwebtoken(jwt) ile token oluştuduk. jwt-secret-key-> primary key(min 21 karakter önerilir güvenlik için), 
                    //  -expiresIn: '1d'-> 1 gün(1d) boyunca geçerli ömrü olsun
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});

                    res.cookie('token', token);

                    return res.json({Status: "Success"});
                }else {
                    return res.json({Error: "Password not matched"});
                }
            })
        }
        // return res.send(sql); -> Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client hatası
    }catch(error) {
        console.log("mail error = ", error);
        return res.json({Error: "Error on server"})
    }
    /* 
    const sql = `SELECT * from login WHERE email = '${req.body.email}'`;

    await db.request().query(sql, function(err, dataser) {
        if(err) 
            return res.json({Error: "Login Error in server"});
        if(dataser.length > 0) {
            bcrypt.compare(req.body.password.toString(), dataser[0].password, (err, response) => {
                if(err)
                    return res.json({Error : "Password compare error"});
                if(response) {
                    return res.json({Status: "Success"});
                }else {
                    return res.json({Error: "Password not matched"});
                }
            })
        }else {
            return res.send("dataser");
        }
    }) 
    */
});


app.listen(8081, () => {
    console.log("Running on port 8081");
})



/* 
const config = {
    user: 'CodingWithAlper',
    password: '1234',
    server: 'LAPTOP-B5A8-PMD',
    database: 'SQL-Tutorial',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
    // ,"driver": "msnodesqlv8",
};

let pool = await mssql.connect(config);

let queryClick = `SELECT * from login`;

let dataDB = await pool.request().query(queryClick);

console.log("dataDB = ", dataDB.recordsets);

 const getDB = async() => {
    try {
        let pool = await mssql.connect(config);

        let queryClick = `SELECT * from login`;

        let dataDB = await pool.request().query(queryClick);

        console.log("dataDB = ", dataDB.recordsets);

        return dataDB;
    }
    catch(error) {
        console.log("No = ", error);
    }
    
}

getDB();
*/