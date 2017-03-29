"use strict";

class awsConfig{

    constructor(){
        this.bucket = "";
        this.accessKeyId = "",
        this.secretAccessKey = "",
        this.s3URL= "",
        this.folder = {
            "folder1":""
        },
        this.fbUrl =  "https://graph.facebook.com/"
    }
};

module.exports = new awsConfig();