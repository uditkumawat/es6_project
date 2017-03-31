/*
 http://www.joshsgman.com/upload-to-and-get-images-from-amazon-s3-with-node-js/

 http://blog.katworksgames.com/2014/01/26/nodejs-deploying-files-to-aws-s3/

 http://aheckmann.github.io/gm/

 http://aheckmann.github.io/gm/docs.html
 */

'use strict';

const AWS = require('aws-sdk');
const gm = require('gm').subClass({imageMagick: true});
const async = require('async');
const fs = require('fs');

let s3config = require('../config/awsConfig');
let keys = s3config;

AWS.config.update({accessKeyId : keys.accessKeyId, secretAccessKey : keys.secretAccessKey,signatureVersion: 'v4'});

let s3 = new AWS.S3();

let createBucket = function(callback) {

    s3.createBucket({Bucket: s3config.bucket}, function () {

        let params = {
            Bucket: s3config.bucket,
            Key: 'myKey',
            Body: 'Hello'
        };

        s3.putObject(params, function (err, data) {
            if (err)
                console.log(err);
            else
                console.log("succes");
        });
    });
};

let uploadFile = function(tempPath,fileName,type,callback)
{
    async.parallel([

        function(cb) {

            fs.readFile(tempPath,function(err,file){

                let params={
                    Bucket: keys.bucket,
                    Key: type+'/'+fileName,
                    Body: file,
                    ACL : 'public-read'
                };

                s3.putObject(params, function (err, data) {
                    if (err) {

                        cb(err);
                    }
                    else {

                        cb();
                    }
                });
            });
        },
        function(cb)
        {
            let thumb_buffer;

            let thumbFile = tempPath+"thumb";

            gm(tempPath).resize('160','160','!').autoOrient().write(thumbFile, function (err) {

                if(err) {

                    cb(err);
                }
                else {

                    fs.readFile(thumbFile,function(err,file){

                        let x = fileName;

                        let fileNameFirst = x.substr(0, x.lastIndexOf('.'));
                        let extension = x.split('.').pop();

                        let params={
                            Bucket: keys.bucket,
                            Key: type+'/'+fileNameFirst+"_thumb."+extension,
                            Body: file,
                            ACL : 'public-read'
                        };

                        s3.putObject(params, function (err, data) {

                            if (err) {

                                cb(err);
                            }
                            else {

                                cb();
                            }
                        });

                    });
                }
            });
        }
    ],function(error,result){
        if(error)
            callback(error);
        else
            callback(null);
    });

};

let listAllBucketsOnAWS = function(callback) {

    s3.listBuckets(function (err, data) {
        if (err) {

            callback(err);
        }
        else {
            for (var index in data.Buckets) {

                var bucket = data.Buckets[index];

            }
            callback(null);
        }
    });
};

module.exports={
    uploadFile : uploadFile
};