"use strict";

const async = require('async');
const redis = require('../../config/dbConfig').redisClient;

let getAllCustomers = function(req,res){

    let data = null;
    
    async.series([
        function(cb)
        {
            redis.get("udit",function(err,result){


                cb();
            });
            
        }
    ],function(err,result){
      if(err)
          res.send(err);
        else
          res.send(data);
    })
}



module.exports = {

    getAllCustomers : getAllCustomers
}