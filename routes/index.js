"use strict";

const path = require('path');
const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validations = require('./validations');
const CONTROLLER = require('../controllers');


router.route('*').get((req,res)=>{
   res.sendFile(path.join(__dirname),'public/index.html');
});

router.route('/logs/:type/:date').get((req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../logs/"+req.params.date+'-'+req.params.type+'.log'));
});

router.route('/admins').get(CONTROLLER.AdminBaseController.getAllAdmins);
router.route('/admin/:id').get(CONTROLLER.AdminBaseController.getAdmin);
router.route('/admin').post(validate(validations.adminValidation.addAdmin),CONTROLLER.AdminBaseController.addAdmin);

router.route('/customer').get(CONTROLLER.CustomerBaseController.getAllCustomers);

//router.route('/paji').get(validate(validations.customerValidation.createTask),CONTROLLER.CustomerBaseController.registerCusto);

module.exports = router;