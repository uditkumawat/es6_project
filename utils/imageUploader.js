
"use strict";

const AWS_CONFIG = require('../config/awsConfig.js');

exports.uploadImageToS3Bucket = function (file, folder, callback) {
    try {

        var job_image_name = file.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')

        var job_image_size = file.size;

        var timestamp = new Date().getTime().toString();

        var str = '';

        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var size = chars.length;

        for (var i = 0; i < 4; i++) {
            var randomnumber = Math.floor(Math.random() * size);
            str = chars[randomnumber] + str;
        }

        job_image_name = job_image_name.replace(/\s/g, '');

        job_image_name = str + timestamp + "-" + job_image_name;

        file.name = job_image_name;

        if (file.flag) file.name = file.name + "." + file.ext

        var fs = require('node-fs');

        var AWS = require('aws-sdk');

        var filename = file.name; // actual filename of file

        var path = file.path; //will be put into a temp directory

        var mimeType = file.type;

        var accessKeyId = AWS_CONFIG.accessKeyId;

        var secretAccessKeyId = AWS_CONFIG.secretAccessKey;

        var bucketName = AWS_CONFIG.bucket;

        fs.readFile(path, function (error, file_buffer) {
            if (error) {
                return callback(0);
            }

            filename = file.name;

            AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKeyId});

            var s3bucket = new AWS.S3();

            var params = {
                Bucket: bucketName,
                Key: folder + '/' + filename,
                Body: file_buffer,
                ACL: 'public-read',
                ContentType: mimeType
            };
            s3bucket.putObject(params, function (err, data) {
                if (err) {
                    return callback(0);
                }
                else {
                    return callback(filename);
                }
            });
        });
    }
    catch (e) {
        return callback(0);
    }
}

/*
 * -----------------------------------------------------------------------------
 * Uploading Thumb image to s3 bucket
 * INPUT : file parameter
 * OUTPUT : image path
 * -----------------------------------------------------------------------------
 */
exports.uploadThumbImageToS3Bucket = function (file, folder, callback) {

    var job_image_name = file.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');

    var job_image_size = file.size;

    var timestamp = new Date().getTime().toString();

    var str = '';

    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var size = chars.length;

    for (var i = 0; i < 4; i++) {
        var randomnumber = Math.floor(Math.random() * size);
        str = chars[randomnumber] + str;
    }

    job_image_name = job_image_name.replace(/\s/g, '');
    job_image_name = str + timestamp + "-" + job_image_name;

    file.name = job_image_name;

    var fs = require('fs');

    var AWS = require('aws-sdk');

    var gm = require('gm').subClass({imageMagick: true});

    var path = file.path; //will be put into a temp directory

    var tmp_path = file.path + "-tmpPath"; //will be put into a temp directory

    gm(path)
        .resize(150, 150, "!")
        .autoOrient()
        .write(tmp_path, function (err) {
            if (!err) {

                var filename = file.name; // actual filename of file
                var mimeType = file.type;

                var accessKeyId = AWS_CONFIG.accessKeyId;

                var secretAccessKeyId = AWS_CONFIG.secretAccessKey;

                var bucketName = AWS_CONFIG.bucket;

                fs.readFile(tmp_path, function (error, file_buffer) {
                    if (error) {
                        return callback(0);
                    } else {
                        filename = "thumb-" + file.name;
                        AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKeyId});
                        var s3bucket = new AWS.S3();
                        var params = {
                            Bucket: bucketName,
                            Key: folder + '/' + filename,
                            Body: file_buffer,
                            ACL: 'public-read',
                            ContentType: mimeType
                        };

                        s3bucket.putObject(params, function (err, data) {
                            if (err) {
                                return callback(0);
                            }
                            else {
                                return callback(filename);
                            }
                        });
                    }
                });
            }
            else {
                return callback(0);
            }
        });
};