"use strict";

const JWT = require('jsonwebtoken');
const async = require('async');
const CONFIG = require('../config');

let createToken = function(userData){

    let accessToken = JWT.sign(userData,CONFIG.APPCONFIG.JWT_SECRET_KEY);

    return accessToken;
};

let verifiyToken = function(accesToken,callback){

    JWT.verify(accesToken,CONFIG.APPCONFIG.JWT_SECRET_KEY,function(err,decodedData){
       if(err)
           callback(err);
       else{
           callback(null,decodedData);
       }
    });
};

module.exports = {

    createToken : createToken,
    verifyToken : verifiyToken
};