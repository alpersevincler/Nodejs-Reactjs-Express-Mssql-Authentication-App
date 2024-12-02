// package.json dosyasındaki "type": "module" ifadesi sayesinde bu şekilde import edebiliyoruz. Diğer şekilde require()'ı kullanmamız gerekirdi
import express from 'express';
import mssql from 'mssql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

const db = mssql.connect(config);


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

const getDB = async() => {
    try {
        let pool = await mssql.connect(config);

        let queryClick = `SELECT * from EmployeeDemographics`;

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