import express from 'express';
import session from "express-session";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import AuthController from './users/auth-controller.js';
import cors from 'cors'
import HelloController from './hello-controller.js';

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
 );
 const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));



const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/mydb'
mongoose.connect(CONNECTION_STRING);
app.use(express.json());
HelloController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);