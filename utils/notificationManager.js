'use strict';

const async = require('async');
const Path = require('path');
const apns = require('apn');
const FCM = require('fcm-node');
const CONFIG = require('../config');
const winston = require('winston');
/*
 ==============================================
 Send the notification to the android device
 ==============================================
 */

let fcm_push_to_android = function(NotifData)
{
    var serverKey = CONFIG.APPCONFIG.FCM_KEY;

    var fcm = new FCM(serverKey);

    var message = {
        to: NotifData.deviceToken,
        data: NotifData.dataToSend.data
    };

    fcm.send(message, function(err, response){
        if(err)
            winston.error("error",err);
    });
};

/*
 ==============================================
 Send the notification to the IOS device
 ==============================================
 */


function sendIosPushNotification(iosDeviceToken, payload, sendTo) {

    var certificate = null;

    if (sendTo == 'USER') {

        certificate = Path.resolve(".") + CONFIG.PUSHCONFIG.iosCustomerApnCertificate;

    } else {

        certificate = Path.resolve(".") + CONFIG.PUSHCONFIG.iosCustomerApnCertificate;
    }

    var status = 1;

    var snd = 'ping.aiff';

    var content=false;

    var options = {
        cert: certificate,
        certData: null,
        key: certificate,
        keyData: null,
        passphrase: 'click',
        ca: null,
        pfx: null,
        pfxData: null,
        port: 2195,
        rejectUnauthorized: true,
        enhanced: true,
        cacheLength: 100,
        autoAdjustCache: true,
        connectionTimeout: 0,
        ssl: true,
        debug: true,
        production: true
    };

    function log(type) {
        return function () {
            console.log("iOS PUSH NOTIFICATION RESULT: " + type);
        }
    }

    if (iosDeviceToken && iosDeviceToken.length > 0) {

        iosDeviceToken.forEach(function (tokenData) {
            try {

                var deviceToken = new apns.Device(tokenData);
                var apnsConnection = new apns.Connection(options);
                var note = new apns.Notification();

                note.expiry = Math.floor(Date.now() / 1000) + 3600;
                note.contentAvailable = true;     //content
                note.sound = snd;
                note.alert = payload.notificationMessage;
                note.newsstandAvailable = status;
                note.payload = {
                    bookingData: payload
                };
                apnsConnection.pushNotification(note, deviceToken);

             
                apnsConnection.on('error', log('error'));
                apnsConnection.on('transmitted', log('transmitted'));
                apnsConnection.on('timeout', log('timeout'));
                apnsConnection.on('connected', log('connected'));
                apnsConnection.on('disconnected', log('disconnected'));
                apnsConnection.on('socketError', log('socketError'));
               
                apnsConnection.on('transmissionError', function(err,data){
                    console.log("err",err,"data",data);
                });

                apnsConnection.on('cacheTooSmall', log('cacheTooSmall'));
            } catch (e) {
                console.trace('exception occured', e)
            }
        })
    }
};


let sendPushToUser = function (NotifData, userId, callback) {

    var deviceToken = NotifData.deviceToken;

    var deviceType = NotifData.deviceType;

    var sendTo = "USER";

    var dataToSend = NotifData.dataToSend;

    if (deviceType == CONFIG.APPCONFIG.DEVICE_TYPES[0] || deviceType == CONFIG.APPCONFIG.DEVICE_TYPES[1]) {

        if (deviceType == CONFIG.APPCONFIG.DATABASE.DEVICE_TYPES[1]) {
            
            fcm_push_to_android(NotifData);

            callback('sentPushToUser');

        } else if (deviceType == CONFIG.APPCONFIG.DATABASE.DEVICE_TYPES[0]) {
            
            sendIosPushNotification([deviceToken], dataToSend, sendTo)

            callback('sentPushToUser');
        }
    } else {

        callback(CONFIG.APPCONFIG.STATUS_MSG.ERROR.IMP_ERROR);
    }
};


function SilentsendIosPushNotification(iosDeviceToken, payload, sendTo) {

    var certificate = null;

    if (sendTo == 'USER') {
        certificate = Path.resolve(".") + Config.pushConfig.iOSPushSettings.user.iosApnCertificate;

    } else {
        certificate = Path.resolve(".") + Config.pushConfig.iOSPushSettings.agent.iosApnCertificate;
    }
    var status = 1;
    var snd = '';
    var content= true;
    console.log('<<<<<<<<<', iosDeviceToken, certificate);
    var options = {
        cert: certificate,
        certData: null,
        key: certificate,
        keyData: null,
        passphrase: 'click',
        ca: null,
        pfx: null,
        pfxData: null,
        port: 2195,
        rejectUnauthorized: true,
        enhanced: true,
        cacheLength: 100,
        autoAdjustCache: true,
        connectionTimeout: 0,
        ssl: true,
        debug: true,
        production: true
    };

    function log(type) {
        return function () {
            console.log("iOS PUSH NOTIFICATION RESULT: " + type);
        }
    }

    if (iosDeviceToken && iosDeviceToken.length > 0) {
        iosDeviceToken.forEach(function (tokenData) {
            try {
                var deviceToken = new apns.Device(tokenData);
                var apnsConnection = new apns.Connection(options);
                var note = new apns.Notification();

                note.expiry = Math.floor(Date.now() / 1000) + 3600;
                note._contentAvailable = content ;
                note.sound = snd;
                note.alert = payload.notificationMessage;
                note.newsstandAvailable = status;
                note.payload = {
                    bookingData: payload
                };
                console.log("note*****",note,note._contentAvailable)
                apnsConnection.pushNotification(note, deviceToken);

                // Handle these events to confirm that the notification gets
                // transmitted to the APN server or find error if any
                apnsConnection.on('error', log('error'));
                apnsConnection.on('transmitted', log('transmitted'));
                apnsConnection.on('timeout', log('timeout'));
                apnsConnection.on('connected', log('connected'));
                apnsConnection.on('disconnected', log('disconnected'));
                apnsConnection.on('socketError', log('socketError'));
                apnsConnection.on('transmissionError', log('transmissionError'));
                apnsConnection.on('cacheTooSmall', log('cacheTooSmall'));
            } catch (e) {
                console.trace('exception occured', e)

            }

        })
    }
}


module.exports = {
    sendPush : sendPushToUser
};