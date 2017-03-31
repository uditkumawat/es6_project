"use strict";

const redis = require('redis');

const winston = require('winston');

class DB {

    constructor() {

        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'develop' || process.env.NODE_ENV == 'DEV') {

            this.dbURL = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+'localhost'+"/"+process.env.MONGO_DBNAME_DEV;
        }
        else if(process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'TEST'){

            this.dbURL = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+'localhost'+"/"+process.env.MONGO_DBNAME_TEST
        }
        else if(process.env.NODE_ENV == 'live' || process.env.NODE_ENV == 'LIVE'){

            this.dbURL = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+'localhost'+"/"+process.env.MONGO_DBNAME_LIVE
        }
        else {
            this.dbURL = "mongodb://localhost/bongour";
        }

        this.redisClient = "";
        this.connectRedisDB();
    }

    connectRedisDB(){

        this.redisClient = redis.createClient();

        this.redisClient.on('connect',(err)=>{
            if(err)
                winston.error("error",err);
            else
                winston.log("info","Redis connected");
        });


        this.redisClient.on('error',(err)=>{
            if(err)
                winston.error("error",err);
        });
    }
};

module.exports = new DB();