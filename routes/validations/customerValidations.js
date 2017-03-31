"use strict";

const Joi= require('joi');

const APP_CONSTANTS = require('../../config/appConfig.js');

module.exports = {

    registerCustomer: {
        body: {
            email: Joi.string().required().trim(),
            password: Joi.string().min(4).trim(),
            facebookId : Joi.string().optional().trim(),
            googleId : Joi.string().optional().trim(),
            cellPhoneNumber : Joi.string().regex(/^[0-9]+$/).required().trim(),
            countryCode : Joi.string().required().trim(),
            deviceType : Joi.string().required().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB),
            deviceToken : Joi.string().required().trim(),
            dateOfBirth : Joi.string().description("YYYY-MM-DD").optional(),
            profilePic : Joi.any().description("Image file"),
            referCode : Joi.string().optional().trim()
        }
    },
    loginViaEmail:{
        body:{
            email : Joi.string().required().trim(),
            password : Joi.string().required().trim(),
            deviceToken : Joi.string().required().trim(),
            deviceType:Joi.string().required().trim().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB)
        }
    },
    loginViaFB:{
        body:{
            email : Joi.string().required().trim(),
            facebookId : Joi.string().required().trim(),
            deviceToken : Joi.string().required().trim(),
            deviceType : Joi.string().required().trim().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB)
        }
    },
    loginViaGoogle:{
        body:{
            email : Joi.string().required().trim(),
            googleId : Joi.string().required().trim(),
            deviceToken : Joi.string().required().trim(),
            deviceType : Joi.string().required().trim().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB)
        }
    },
    forgotPassword:{
        body:{
            email : Joi.string().required().trim()
        }
    },
    accessToken:{
        body:{
            accessToken : Joi.string().optional().trim(),
            webAccesstoken : Joi.string().optional().trim(),
            deviceToken : Joi.string().required().trim(),
            deviceType : Joi.string().required().trim().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB)
        }
    },
    logout : {
        body:{
            accessToken : Joi.string().optional().trim(),
            webAccessToken : Joi.string().optional().trim(),
            deviceType:Joi.string().required().trim().description(APP_CONSTANTS.DEVICE_TYPES.ANDROID,APP_CONSTANTS.DEVICE_TYPES.IOS,APP_CONSTANTS.DEVICE_TYPES.WEB),
            deviceToken:Joi.string().required().trim()
        }
    }
};
