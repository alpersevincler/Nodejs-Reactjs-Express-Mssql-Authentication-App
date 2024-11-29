// package.json dosyasındaki "type": "module" ifadesi sayesinde bu şekilde import edebiliyoruz
import express from 'express';
import mssql from 'mssql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express();

app.use(express.json());
app.use(cors());