"use strict";

class awsConfig{

    constructor(){
        this.bucket = "";
        this.accessKeyId = "",
        this.secretAccessKey = "",
        this.s3URL= "",
        this.folder = {
            "customers":"customers",
            "customerThumb":"customerThumb"
        },
        this.fbUrl =  "https://graph.facebook.com/"
    }
};

module.exports = new awsConfig();