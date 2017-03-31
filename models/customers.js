"use strict";

"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APPCONFIG = require('../config/appConfig.js');

let CARDS = new Schema({

    cardNumber : {type:String,trim:true},
    cardType: {type:String,trim:true},
    cardToken : {type:String,trim:true},
    customerId : {type:String,trim:true},
    isDefault: {type:Boolean,default:false},
    isActive : {type:Boolean,default:false}
});

let ADDRESS = new Schema({

    address : {
        streetNumber : {type:String,default:null},
        streetName : {type:String,default:null},
        suburb : {type:String,default:null},
        state : {type : String,default:null},
        postcode : {type:String,default:null},
        isActive : {type:Boolean,default:true},
        isDefault : {type:Boolean,default:false}
    },

    location:{
        'type':{type:String,default: "Point"},
        coordinates: {type: [Number], default: [0, 0],required: true}
    },

    isActive : {type:Boolean,default:true},

    isDefault : {type:Boolean,default:false}
});


let customerSchema = new Schema({

    email : {type : String,trim:true,unique:true},

    password : {type : String,trim:true},

    firstName : {type : String,trim : true},

    lastName : {type : String,trim:true},

    facebookId : {type : String,default:null,trim:true},

    googleId : {type : String,default : null,trim:true},

    countryCode  : {type : String,trim:true},

    cellPhoneNumber : {type : String,trim:true},

    dateOfBirth : {type:String,trim:true},

    gender : {type : String,enum:['MALE','FEMALE'],trim:true},

    profilePic : {
        thumb : {type : String,default:null},
        original : {type : String,default:null}
    },

    deviceToken : {type:String,default:null,trim:true},

    deviceType : {type:String,enum : [APPCONFIG.DEVICE_TYPES.ANDROID,APPCONFIG.DEVICE_TYPES.IOS,APPCONFIG.DEVICE_TYPES.WEB],default:null},

    accessToken : {type:String,default:null,trim:true},

    webAccessToken : {type:String,default:null,trim:true},
    
    otp : {type:Number,default:null},

    isKitchenAdded : {type:Boolean,default:false},

    isBlocked : {type:Boolean,default:false},

    isVerified : {type:Boolean,default:false},

    registrationDate : {type:Date,default:new Date()},
    
    credits : {type:Number,default:0},

    paymentCards : {type : [CARDS]},

    address : {type:[ADDRESS]}

},{
    timestamps : true
});

customerSchema.index({'address.location':'2dsphere'});

let handleE11000 = function(error, res, next) {

    if (error.name === 'ValidationError') {

        next(error);
    } else {
        next();
    }
};

customerSchema.post('save', handleE11000);
customerSchema.post('update', handleE11000);
customerSchema.post('findOneAndUpdate', handleE11000);
customerSchema.post('insertMany', handleE11000);

module.exports = mongoose.model('customers',customerSchema,'customers');