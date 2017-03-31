"use strict";

const async = require('async');
const winston = require('winston');
const redis = require('../../config/dbConfig').redisClient;
const UniversalFunctions = require('../../utils');

const AWS_CONFIG = require('../../config/awsConfig');
const Models = require('../../models');

const CONFIG = require('../../config');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

const CUSTOMER_KEY = "customer";

let registerCustomer = function(req,res){

    let payload = req.body;

    let customerData = null;

    async.series([
        function(cb){

            if(UniversalFunctions.UTILITIES.verifyEmailFormat(payload.email)==false)
            {
                cb(ERROR.INVALID_EMAIL);
            }
            else if((payload.hasOwnProperty("facebookId") && payload.facebookId) && (payload.hasOwnProperty("password") && payload.password))
            {
                cb(ERROR.FACEBOOK_ID_PASSWORD_ERROR);
            }
            else if((payload.hasOwnProperty("googleId") && payload.googleId) && (payload.hasOwnProperty("password") && payload.password))
            {
                cb(ERROR.GOOGLE_ID_PASSWORD_ERROR);
            }
            else if((payload.hasOwnProperty("facebookId")==false && payload.hasOwnProperty("googleId")==false) && payload.hasOwnProperty("password")==false)
            {
                cb(ERROR.PASSWORD_REQUIRED);
            }
            else if((payload.hasOwnProperty("countryCode") && (payload.countryCode.lastIndexOf('+')==0)) && (!isFinite(payload.countryCode.substr(1))))
            {
                cb(ERROR.INVALID_COUNTRY_CODE);
            }
            else if(payload.hasOwnProperty("cellPhoneNumber") && payload.cellPhoneNumber && payload.cellPhoneNumber.split('')[0]==0)
            {
                cb(ERROR.INVALID_PHONE_NO_FORMAT);
            }
            else{
                cb();
            }
        },
        function(cb) {

            if (payload.hasOwnProperty("email") && payload.email)
                payload.email = payload.email.toLowerCase();

            if (payload.hasOwnProperty("password") && payload.password)
                payload.password = UniversalFunctions.UTILITIES.hashPassword(payload.password);


            payload.profilePicURL = {
                original: null,
                thumbnail: null
            };

            payload.registrationDate = new Date().toISOString()


            let query = {
                $or: [{email: payload.email}, {cellPhoneNumber: payload.cellPhoneNumber}, {facebookId: payload.facebookId}, {googleId: payload.googleId}]
            };

            let projection = {};

            let options = {
                lean: true
            };

            Models.Customers.find(query, projection, options, function (err, data) {
                if (err)
                    cb(err);
                else {
                    if (data && data.length > 0) {

                        let found = 0;

                        for (let i = 0; i < data.length; i++) {

                            let dbData = data[i];

                            if ((dbData.hasOwnProperty("email") && payload.hasOwnProperty("email")) && (dbData.email == payload.email)) {
                                cb(ERROR.EMAIL_ALREADY_EXIST);

                                found = 1;
                                break;
                            }
                            else if ((dbData.hasOwnProperty("facebookId") && payload.hasOwnProperty("facebookId")) && (dbData.facebookId == payload.facebookId)) {
                                cb(ERROR.DUPLICATE_FACEBOOK_ID);

                                found = 1;
                                break;
                            }
                            else if ((dbData.hasOwnProperty("googleId") && payload.hasOwnProperty("googleId")) && (dbData.googleId == payload.googleId)) {
                                cb(ERROR.DUPLICATE_GOOGLE_ID);

                                found = 1;
                                break;
                            }
                            else if ((dbData.hasOwnProperty("cellPhoneNumber") && payload.hasOwnProperty("cellPhoneNumber")) && (dbData.cellPhoneNumber == payload.cellPhoneNumber)) {
                                cb(ERROR.PHONE_ALREADY_EXIST);

                                found = 1;
                                break;
                            }
                        }

                        if (found == 0) {
                            cb();
                        }
                    }
                    else {
                        cb(null);
                    }
                }
            });
        },
        function(cb){

            UniversalFunctions.UTILITIES.generateUniqueCode(4,CONFIG.APPCONFIG.DATABASE.USER_TYPE.CUSTOMER,function(err,data){
                if(err)
                    cb(err);
                else{
                    if(data){

                        payload.otp = data.number;
                        cb();
                    }
                    else{
                        cb(ERROR.IMP_ERROR);
                    }
                }
            });
        },
        function(cb){

            let customer = new Models.Customers(payload);

            customer.save(function(err,data){

                if(err) {
                    winston.log("error",err);
                    cb(ERROR.DB_ERROR);
                }
                else {
                    if(data)
                    {
                        customerData = data;
                        cb();
                    }
                    else{
                        cb(ERROR.IMP_ERROR);
                    }
                }
            });
        },
        function(cb){

            let tokenCreation={};

            tokenCreation._id = customerData._id;
            tokenCreation.time = new Date().toISOString();
            tokenCreation.userType = 'CUSTOMER';
            tokenCreation.tokenType = 'APP';

            //creation of app accesstoken
            customerData.accessToken = UniversalFunctions.TOKEN.createToken(tokenCreation);

            //creation of web accessToken
            tokenCreation.tokenType = 'WEB';

            customerData.webAccessToken = UniversalFunctions.TOKEN.createToken(tokenCreation);

            customerData.save((err,data)=>{

                cb();
            });
        },
        function(cb){

            if (req.files && req.files.profilePic && req.files.profilePic.size > 0) {

                UniversalFunctions.IMAGEUPLOADER.uploadImageToS3Bucket(req.files.profilePic, AWS_CONFIG.folder.customers, function (original) {

                    if (original == 0) {
                        cb(res);
                    }
                    else
                    {

                        UniversalFunctions.IMAGEUPLOADER.uploadThumbImageToS3Bucket(req.files.profilePic,AWS_CONFIG.folder.customerThumb, function (thumb) {

                            if (thumb == 0) {
                                cb(err);
                            } else {

                                let original = AWS_CONFIG.s3URL + "/" + AWS_CONFIG.folder.customers + "/" + original;

                                let thumb = AWS_CONFIG.s3URL + "/" + AWS_CONFIG.folder.customerThumb + "/" + thumb;

                                payload.profilePicURL = {
                                    original: original,
                                    thumbnail: thumb
                                };

                                customerData.save((err,data)=>{
                                   cb();
                                });
                            }
                        });
                    }
                });
            }
            else{
                cb();
            }

        }
    ],function(err,result){
      if(err)
          res.send(err);
        else {

          let response = SUCCESS.CUSTOMER_ADDED;
          response.data = customerData;
          res.send(response);
      }
    })
};

let loginViaEmail = function(req,res){

    let userData = null;
    
    let payloadData = req.body;
    
    async.series([
        function(cb){

            if(UniversalFunctions.UTILITIES.verifyEmailFormat(payloadData.email)==false)
            {
                cb(ERROR.INVALID_EMAIL);
            }
            else if((payloadData.hasOwnProperty("facebookId") && payloadData.facebookId) && (payloadData.hasOwnProperty("password") && payloadData.password))
            {
                cb(ERROR.FACEBOOK_ID_PASSWORD_ERROR);
            }
            else if((payloadData.hasOwnProperty("googleId") && payloadData.googleId) && (payloadData.hasOwnProperty("password") && payloadData.password))
            {
                cb(ERROR.GOOGLE_ID_PASSWORD_ERROR);
            }
            else if((payloadData.hasOwnProperty("facebookId")==false && payloadData.hasOwnProperty("googleId")==false) && payloadData.hasOwnProperty("password")==false)
            {
                cb(ERROR.PASSWORD_REQUIRED);
            }
            else if((payloadData.hasOwnProperty("countryCode") && (payloadData.countryCode.lastIndexOf('+')==0)) && (!isFinite(payloadData.countryCode.substr(1))))
            {
                cb(ERROR.INVALID_COUNTRY_CODE);
            }
            else if(payloadData.hasOwnProperty("cellPhoneNumber") && payloadData.cellPhoneNumber && payloadData.cellPhoneNumber.split('')[0]==0)
            {
                cb(ERROR.INVALID_PHONE_NO_FORMAT);
            }
            else{
                cb();
            }
        },
        function(cb){

            let query={
                email : payloadData.email.toLowerCase()
            };

            let projection={};
            let options={};

            Models.Customers.find(query,projection,options,(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData.length!=0){

                       userData = dbData[0];
                       cb();
                   }
                   else{
                       cb(ERROR.USER_NOT_FOUND);
                   }
               }
            });
        },
        function(cb){
            
            UniversalFunctions.UTILITIES.passwordCheck(payloadData.password,userData.password,(err,result)=>{

                if(err)
                   cb(err);
               else{
                   if(result==true){
                       cb();
                   }
                   else{
                       cb(ERROR.INCORRECT_PASSWORD);
                   }
               }
            });
        },
        function(cb){

            let dataToUpdate={};

            let tokenData = {};

            tokenData._id = userData._id;
            tokenData.time = new Date().toISOString();
            tokenData.type = 'CUSTOMER'

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';

            }
            else{

                tokenData.tokenType = 'WEB';
            }

            let newToken = UniversalFunctions.TOKEN.createToken(tokenData);

            dataToUpdate.deviceType = payloadData.deviceType;
            dataToUpdate.deviceToken = payloadData.deviceToken;

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';
                dataToUpdate.accessToken = newToken;
            }
            else{

                tokenData.tokenType = 'WEB';
                dataToUpdate.webAccessToken = newToken;
            }

            let query={
                _id : userData._id
            };

            let update={
                $set:dataToUpdate
            }

            let options={
                new : true
            };

            Models.Customers.findOneAndUpdate(query,update,options,(err,res)=>{
                if(err)
                  cb(err);
                else{
                  if(res){
                      userData = res;

                      const key = CUSTOMER_KEY + userData._id;
                      const value = JSON.stringify(userData);

                      redis.set(key,value);

                      cb();
                  }
                  else {
                      cb();
                  }
              }
            });
        }
    ],function(error,result){
        if(error)
            res.send(error);
        else{
            var response = SUCCESS.LOGGED_IN_SUCCESSFULLY;
            response.data = userData;
            res.send(response);
        }
    });
};

let loginViaFB = function(req,res){

    let payloadData = req.body;

    let userData = null;

    async.series([
        function(cb){

            let query={
                email : payloadData.email,
                facebookId : payloadData.facebookId
            };

            let projection={};

            let options={};

            Models.Customers.find(query,projection,options,(err,dbData)=>{
                if(err)
                    cb(err);
                else{
                    if(dbData.length!=0){
                        userData = dbData[0];
                        cb();
                    }
                    else{
                        cb(ERROR.USER_NOT_FOUND);
                    }
                }
            });
        },
        function(cb){

            let dataToUpdate={};

            let tokenData = {};

            tokenData._id = userData._id;
            tokenData.time = new Date().toISOString();
            tokenData.type = 'CUSTOMER'

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';

            }
            else{

                tokenData.tokenType = 'WEB';
            }

            let newToken = UniversalFunctions.TOKEN.createToken(tokenData);

            dataToUpdate.deviceType = payloadData.deviceType;
            dataToUpdate.deviceToken = payloadData.deviceToken;

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';
                dataToUpdate.accessToken = newToken;
            }
            else{

                tokenData.tokenType = 'WEB';
                dataToUpdate.webAccessToken = newToken;
            }

            let query={
                _id : userData._id
            };

            let update={
                $set:dataToUpdate
            }

            let options={
                new:true
            };

            Models.Customers.findOneAndUpdate(query,update,options,(err,dbData)=>{
                if(err)
                    cb(err);
                else{
                    if(dbData){
                        userData = dbData;

                        const key = CUSTOMER_KEY+userData._id;
                        const value = JSON.stringify(userData);

                        redis.set(key,value);
                        
                        cb();
                    }
                    else{
                        cb();
                    }
                }
            });
        }
    ],function(error,result){
        if(error)
            res.send(error);
        else{
            var response = SUCCESS.LOGGED_IN_SUCCESSFULLY;
            response.data = userData;
            res.send(response);
        }
    });
    
};

let loginViaGoogle = function(req,res){

    let payloadData = req.body;

    let userData = null;

    async.series([
        function(cb){
            
            let query={
                email : payloadData.email,
                googleId : payloadData.googleId
            };

            let projection={};

            let options={};

            Models.Customers.find(query,projection,options,(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData.length!=0){
                        userData = dbData[0];
                       cb();
                   }
                   else{
                       cb(ERROR.USER_NOT_FOUND);
                   }
               }
            });
        },
        function(cb){

            let dataToUpdate={};

            let tokenData = {};

            tokenData._id = userData._id;
            tokenData.time = new Date().toISOString();
            tokenData.type = 'CUSTOMER'

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';

            }
            else{

                tokenData.tokenType = 'WEB';
            }

            let newToken = UniversalFunctions.TOKEN.createToken(tokenData);

            dataToUpdate.deviceType = payloadData.deviceType;
            dataToUpdate.deviceToken = payloadData.deviceToken;

            if(payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.IOS || payloadData.deviceType==CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID) {

                tokenData.tokenType = 'APP';
                dataToUpdate.accessToken = newToken;
            }
            else{

                tokenData.tokenType = 'WEB';
                dataToUpdate.webAccessToken = newToken;
            }

            let query={
                _id : userData._id
            };

            let update={
                $set:dataToUpdate
            }

            let options={
                new:true
            };

            Models.Customers.findOneAndUpdate(query,update,options,(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData){
                       userData = dbData;

                       const key = CUSTOMER_KEY+userData._id;
                       const value = JSON.stringify(userData);

                       redis.set(key,value);

                       cb();
                   }
                   else{
                       cb();
                   }
               }
            });
        }
    ],function(error,result){
        if(error)
            res.send(error);
        else{
            var response = SUCCESS.LOGGED_IN_SUCCESSFULLY;
            response.data = userData;
            res.send(response);
        }
    });
}

let forgotPassword = function(req,res){

    let payloadData = req.body;
    let dataToSend = null;

    async.series([
        function(cb){

            let query={
                email : payloadData.email
            };

            let projection={};

            let options={};

            Models.Customers.find(query,projection,options,(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData.length!=0){
                        dataToSend = dbData[0];
                       cb();
                   }
                   else{
                       cb(ERROR.USER_NOT_FOUND);
                   }
               }
            });
        }
    ],function(err,result){
        if(err)
            res.send(err);
        else{
            var response = SUCCESS.FORGOT_PASSWORD;
            response.data = dataToSend;
            res.send(response);
        }
    })
};

let customerAccessTokenLogin = function(req,res){

    let userData = null;

    let payloadData = req.body;

    async.series([
        function(cb){

            const key = "customer"+payloadData._id;

            redis.get(key,function(err,result){

                if(err)
                    cb(err);
                else{
                    if(!result){

                        let query={
                            _id : payloadData._id
                        };

                        let dataToUpdate={
                            deviceToken : payloadData.deviceToken,
                            deviceType : payloadData.deviceType
                        };

                        let options={
                            lean:true,
                            new:true
                        };

                        Models.Customers.findOneAndUpdate(query,dataToUpdate,options,(err,dbData)=>{
                           if(err)
                               cb(err);
                           else{
                               if(res){

                                   userData = dbData;

                                   const value = "customer"+payloadData._id;

                                   redis.set(key,value);

                                   cb();
                               }
                               else{
                                   cb(ERROR.USER_NOT_FOUND);
                               }
                           }
                        });
                    }
                    else{

                        userData = JSON.parse(result);
                        cb();
                    }
                }
            });
        }
    ],function(error,result){
        if(error)
            res.send(error);
        else{
            var response = SUCCESS.LOGGED_IN_SUCCESSFULLY;
            response.data = userData;
            res.send(response);
        }
    });
};

let logoutCustomer = function(req,res){

    let payloadData = req.body;

    async.series([
        function(cb)
        {
            let query={
                _id : payloadData._id
            };

            let dataToUpdate={};

            dataToUpdate.deviceToken = null;
            
            if(payloadData.deviceType == CONFIG.APPCONFIG.DEVICE_TYPES.ANDROID || payloadData.deviceType == CONFIG.APPCONFIG.DEVICE_TYPES.IOS)
                dataToUpdate.accessToken = null;
            else
                dataToUpdate.webAccessToken = null;

            let dataToSet={
                $set:dataToUpdate
            };

            let options={
                new : true
            };

            Models.Customers.findOneAndUpdate(query,dataToSet,options,(err,dbData)=>{
                if(err)
                    cb(err);
                else{
                    if(dbData){

                        const key = CUSTOMER_KEY + payloadData._id;

                        redis.del(key);

                        cb();
                    }
                    else{
                        cb(ERROR.USER_NOT_FOUND);
                    }
                }
            });
        }
    ],function(error,result){
        if(error)
            res.send(error);
        else{

            let response = SUCCESS.LOGOUT;

            res.send(response);
        }

    });
};


module.exports = {


    registerCustomer : registerCustomer,
    loginViaEmail : loginViaEmail,
    loginViaFB : loginViaFB,
    loginViaGoogle : loginViaGoogle,
    forgotPassword : forgotPassword,
    customerAccessTokenLogin : customerAccessTokenLogin,
    logoutCustomer : logoutCustomer,

}