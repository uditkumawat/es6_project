"use strict";

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const winston = require('winston');
const swagger = require('swagger-express');
const path = require('path');
const expressValidation = require('express-validation');


const ROUTES = require('./routes');
const CONFIG = require('./config');
const Bootstraping = require('./utils/bootstraping.js');

class Server{
    
    constructor(){

        this.PORT = CONFIG.SERVERCONFIG.PORT;

        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){

        this.app.set('port',this.PORT);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(express.static(path.join(__dirname,'public')));

        this.app.use(swagger.init(this.app,{
            apiVersion : '1.0',
            swaggerVersion : '1.0',
            basePath : CONFIG.APPCONFIG.SWAGGER_BASE_LINK + this.PORT,
            swaggerURL : '/swagger',
            swaggerJSON : '/api-docs.json',
            swaggerUI : './public/swagger/',
            apis : ['./swagger/admin.yml'],
            info:{
                title : 'ES6 Project structure',
                name : 'Project APIs'
            }
        }));
    }

    connectdbs(){

        mongoose.connect(CONFIG.DBCONFIG.dbURL,(err,db)=>{
            if(err)
                winston.error('error',err);
            else
                winston.log('info','Connected to MONGO Database');
        });
    }

    includeRoutes(){

        this.app.use('/api',ROUTES);   // all of our routes will be prefixed with /api

        this.app.use((req,res,next)=>{

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);

            let message = {"METHOD":req.method,"URL":req.url,"BODY":req.body};
            message = JSON.stringify(message);
            winston.log('info',message);

            next();
        });
        
        this.app.use((err,req,res,next)=>{

            if (err instanceof expressValidation.ValidationError) {

                res.send(err);
            } else {
                res.status(500)
                    .json({
                        status: err.status,
                        message: err.message
                    });
            }
        });
    }

    bootstrapping(){
        new Bootstraping();
    }

    appExecute(){
        
        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.PORT,this.HOST,()=>{
            winston.log('info','Server Starts');
        });

        this.connectdbs();
        this.bootstrapping();

    }
};

const SERVER = new Server();
SERVER.appExecute();