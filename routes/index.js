"use strict";

const path = require('path');
const express = require('express');
const winston = require('winston');
const router = express.Router();
const validate = require('express-validation');
const validations = require('./validations');
const CONTROLLER = require('../controllers');
const UniversalFunctions = require('../utils');
const Models = require('../models');

router.use(function(req,res,next){

    winston.log("info",req.method,req.url);
    next();
});

router.route('*').get((req,res)=>{
   res.sendFile(path.join(__dirname),'public/index.html');
});

router.route('/logs/:type/:date').get((req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../logs/"+req.params.date+'-'+req.params.type+'.log'));
});

/*
Admin Routes
 */

router.route('/admins').get(CONTROLLER.AdminBaseController.getAllAdmins);
router.route('/admin/:id').get(CONTROLLER.AdminBaseController.getAdmin);
router.route('/admin').post(validate(validations.adminValidation.addAdmin),CONTROLLER.AdminBaseController.addAdmin);


/*
Customer Routes
 */

router.route('/customer').post(validate(validations.customerValidation.registerCustomer),CONTROLLER.CustomerBaseController.registerCustomer);
router.route('/customer/loginEmail').post(validate(validations.customerValidation.loginViaEmail),CONTROLLER.CustomerBaseController.loginViaEmail);
router.route('/customer/loginViaFB').post(validate(validations.customerValidation.loginViaFB),CONTROLLER.CustomerBaseController.loginViaFB);
router.route('/customer/loginViaGoogle').post(validate(validations.customerValidation.loginViaGoogle),CONTROLLER.CustomerBaseController.loginViaGoogle);
router.route('/customer/forgotPassword').post(validate(validations.customerValidation.forgotPassword),CONTROLLER.CustomerBaseController.forgotPassword);

//authenticate customer routes
router.use(function(req,res,next){

    let accessToken = req.body.accessToken || req.query.accessToken || req.params.accessToken || req.headers['x-access-token'];

    let webAccessToken = req.body.webAccessToken || req.query.webAccessToken || req.params.webAccessToken || req.headers['x-access-token'];

    if(accessToken!=null && accessToken!=undefined){

        UniversalFunctions.TOKEN.verifyToken(accessToken,function(err,decodedData){

            if(err){
                return res.json({statusCode:'400',message:'Failed to authenticate.Invalid token'});
            }
            else{
                if(decodedData){

                    let query={
                        _id : decodedData._id,
                        accessToken : accessToken
                    };

                    let projection={};
                    let options={};

                    Models.Customers.find(query,projection,options,function(err,data){
                        if(err){
                            return res.json({success:false,message:'Failed to authenticate.Invalid Token'});
                        }
                        else{
                            if(data.length!=0){
                                req.body._id = decodedData._id;
                                next();
                            }
                            else{
                                return res.status(403).send({
                                    "statusCode": 403,
                                    "error": "Unauthorized",
                                    "message": "Unauthorized",
                                    "attributes": {
                                        "error": "Bad token"
                                    }
                                });
                            }
                        }

                    });
                }
                else{
                    return res.json({success:false,message:'Token not decoded',statusCode:403});
                }
            }
        });
    }
    else if(webAccessToken!=null && webAccessToken!=undefined){

        UniversalFunctions.TOKEN.verifyToken(webAccessToken,function(err,decodedData){

            if(err){
                return res.json({statusCode:'400',message:'Failed to authenticate.Invalid token'});
            }
            else{
                if(decodedData){

                    let query={
                        _id : decodedData._id,
                        webAccessToken : webAccessToken
                    };

                    let projection={};
                    let options={};

                    Models.Customers.find(query,projection,options,function(err,data){
                        if(err){
                            return res.json({success:false,message:'Failed to authenticate.Invalid Token'});
                        }
                        else{
                            if(data.length!=0){
                                req.body._id = decodedData._id;
                                next();
                            }
                            else{
                                return res.status(403).send({
                                    "statusCode": 403,
                                    "error": "Unauthorized",
                                    "message": "Unauthorized",
                                    "attributes": {
                                        "error": "Bad token"
                                    }
                                });
                            }
                        }

                    });
                }
                else{
                    return res.json({success:false,message:'Token not decoded',statusCode:403});
                }
            }
        });
    }
    else{
        return res.status(400).send({
            "statusCode": 400,
            "error": "Access Token Not Provided ( key - accessToken(for IOS,ANDROID) / webAccessToken( for WEB))",
            "message": "Access Token Not Provided",
            "attributes": {
                "error": "Bad Request"
            }
        });
    }
});

router.route('/customer/accessToken').post(validate(validations.customerValidation.accessToken),CONTROLLER.CustomerBaseController.customerAccessTokenLogin);
router.route('/customer/logout').put(validate(validations.customerValidation.logout),CONTROLLER.CustomerBaseController.logoutCustomer);



module.exports = router;