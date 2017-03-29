"use strict";

const Joi= require('joi');

module.exports = {

    createTask: {
        body: {
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            description: Joi.string().required(),
            done: Joi.boolean()
        }
    }
};
