'use strict';

let async = require('async');
let _ = require('underscore');
const CONFIG = require('../config');
const Models = require('../models');
const bcrypt = require('bcrypt');
const validator = require('validator');

exports.hashPassword = function(string){
  return bcrypt.hashSync(string,10);
};

exports.passwordCheck = function(userEnteredPassword,dbStoredPassword,callback){
    
    bcrypt.compare(userEnteredPassword, dbStoredPassword, function (err, isMatch) {
        if (err)
            return callback(err);

        if (isMatch == true) {
            callback(null,true);
        }
        else {
            callback(null,false);
        }
    });
};

exports.verifyEmailFormat = function(email){
    return validator.isEmail(email);
};

exports.generateUniqueCode = function (noOfDigits,userRole, callback) {

    noOfDigits = noOfDigits || 5;

    var excludeArray = [];

    var generatedRandomCode = null;

    async.series([

        function (cb) {

            //Push All generated codes in excludeAry

            if (userRole == CONFIG.APPCONFIG.DATABASE.USER_TYPE.CUSTOMER) {

                Models.Customers.find({},{},{},function(err,data){
                   if(err)
                       cb(err)
                    else{
                       if(data.length!=0){

                           data.forEach(function(customer){

                               excludeArray.push(customer.otp);
                           })

                           cb();
                       }
                       else{
                           cb();
                       }
                   }
                });
            }
            else {
                cb(CONFIG.APPCONFIG.STATUS_MSG.ERROR.IMP_ERROR)
            }
        },
        function (cb) {

            //Generate Random Code of digits specified
            generatedRandomCode = generateRandomNumbers(noOfDigits,excludeArray);

            cb();

        }], function (err, data) {
        
            callback(err,{number : generatedRandomCode})
    });


};




exports.generateReferCode = function(noOfDigits,callback)
{
    noOfDigits = noOfDigits || 5;

    var num = null;

    async.series([
        function(cb){

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                return result;
            }

            num = randomString(noOfDigits, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            num = num.toUpperCase();
            cb();
        }
    ],function(err,result){
        if(err)
            return callback(err);
        else
            return callback(err,{number : num})
    });

};


let generateRandomNumbers = function (numberLength, excludeList) {

    var arrayList = [];

    excludeList = excludeList || [];

    var minString = "1";

    var maxString = "9";

    for (var i=1; i < numberLength; i++){

        minString = minString + "0";
        maxString = maxString +  "9";
    }

    var minNumber = 1;

    var maxNumber = parseInt(maxString);

    for (i = minNumber; i < maxNumber; i ++){

        var digitToCheck = i.toString();

        if (digitToCheck.length < numberLength){

            var diff = numberLength - digitToCheck.length;

            var zeros = '';

            for (var j = 0; j<diff; j++){
                zeros+='0';
            }

            digitToCheck = digitToCheck + zeros
        }

        if (excludeList.indexOf(digitToCheck) == -1){
            arrayList.push(digitToCheck)
        }
    }
    if (arrayList.length > 0){
        arrayList = _.shuffle(arrayList);
        return arrayList[0];
    }else {
        return false;
    }
};
