require('dotenv').config()
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT;

// Connexion à la base de données
const MONGO_URL = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

const start = async () => {
    try {
        server.listen(port, () => {
            console.log('le serveur à demarré sur le port ' + port);
        })
    } catch {
        console.log('Connexion avec la base de données echouée!');    
    }
}

start();