"use strict";

"use strict";

const Joi= require('joi');

module.exports = {

    addAdmin: {
        body: {
            emailId : Joi.string().required(),
            userName : Joi.string().required(),
            cellPhoneNumber: Joi.string().required(),
            countryCode : Joi.string().required(),
            password : Joi.string().required()
        }
    }
};
