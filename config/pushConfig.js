"use strict";

class pushSettings{

    constructor(){

        this.androidcustomerGcmKey = "";
        this.androidSPGcmKey = "";
        this.iosGateway = "gateway.push.apple.com";
        this.iosCustomerApnCertificate = "/certs/";
        this.iosSPApnCertificate = "/certs/";
    }
};

module.exports = new pushSettings();