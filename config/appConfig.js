"use strict";

let SWAGGER_BASE_LINK = null;

if(!process.env.NODE_ENV)
{
    SWAGGER_BASE_LINK = "http://localhost:";
}

const ADMIN_TYPES = {
    SUPER_ADMIN : 'SUPER_ADMIN',
    SUB_ADMIN : 'SUB_ADMIN'
};

const APP_NAME = 'BONGOUR';

const BOOKING_STATUS = {
    FAILED : 'FAILED',
    ACCPETED : 'ACCEPTED',
    ASSIGNED : 'ASSIGNED',
    NOT_ACCEPTED: 'NOT_ACCEPTED',
    NOT_STARTED: 'NOT_STARTED',
    WAITING: 'WAITING',
    BOOKED: 'BOOKED',
    ONGOING: 'ONGOING',
    STARTED: 'STARTED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    DECLINED: 'DECLINED',
    EXPIRED: 'EXPIRED',
    DROPPED: 'DROPPED',
    REACHED: 'REACHED',
    PENDING: 'PENDING',
    ARRIVED:'ARRIVED'
};

const JWT_SECRET_KEY = 'secretKeyOfBongourProject1234567890@';

const GOOGLE_API_KEY = "";

const DATABASE={

    PROMO_TYPE:{
        PERCENT : 'PERCENT',
        AMOUNT : 'AMOUNT'
    },
    ADMIN_TYPE:{
        SUPER_ADMIN:'SUPER_ADMIN',
        SUB_ADMIN:'SUB_ADMIN',
        FINANCE_ADMIN:'FINANCE_ADMIN'
    },
    USER_TYPE:{
        CUSTOMER:'CUSTOMER',
        SERVICE_PROVIDER:'SERVICE_PROVIDER',
        ADMIN:'ADMIN',
        COMPANY:'COMPANY'
    },
    GENDER:{
        MALE:'MALE',
        FEMALE:'FEMALE'
    }
};

const PAYMENT={

    PAYMENT_STATUS: {
        WAITING: 'WAITING',
        COMPLETED: 'COMPLETED',
        DECLINED: 'DECLINED',
        HOLD: 'HOLD',
        REFUND: 'REFUND'
    },
    PAYMENT_OPTIONS: {
        CREDIT_DEBIT_CARD: 'CREDIT_DEBIT_CARD',
        PAYPAL: 'PAYPAL',
        BITCOIN: 'BITCOIN',
        GOOGLE_WALLET: 'GOOGLE_WALLET',
        APPLE_PAY: 'APPLE_PAY',
        EIYA_CASH: 'EIYA_CASH',
        WALLET:'WALLET',
        CARD:'CARD',
        CREDITS:'CREDITS',
        CASH:'CASH'
    }
};

const DEVICE_TYPES = {
    IOS: 'IOS',
    ANDROID : 'ANDROID',
    WEB :'WEB'
}

const STATUS_MSG = {
    ERROR: {
        AGENT_COORDINATES:{
            statusCode : 400,
            message : 'Agent Coordinates not there',
            type : 'AGENT_COORDINATES'
        },
        CATEGORY_DOES_NOT_EXIST_OR_NO_SUBCATEGORY:{
            statusCode : 400,
            message : 'Either category does not exist or it contains no service',
            type : 'CATEGORY_DOES_NOT_EXIST_OR_NO_SUBCATEGORY'
        },
        DATA_CANNOT_BE_NULL:{
            statusCode : 400,
            message : 'DATA_CANNOT_BE_NULL',
            type : 'DATA_CANNOT_BE_NULL'
        },
        SUBCATEGORY_ALREADY_UNBLOCKED:{
            statusCode : 400,
            message : 'SubCategory already unblocked',
            type : 'SUBCATEGORY_ALREADY_UNBLOCKED'
        },
        CATEGORY_ALREADY_UNBLOCKED:{
            statusCode : 400,
            message : 'Category already unblocked',
            type : 'CATEGORY_ALREADY_UNBLOCKED'
        },
        SUBSERVICE_ALREADY_UNBLOCKED:{
            statusCode : 400,
            message : 'SubService already unblocked',
            type : 'SUBSERVICE_ALREADY_UNBLOCKED'
        },
        SERVICE_ALREADY_UNBLOCKED:{
            statusCode : 400,
            message : 'Service already unblocked',
            type : 'SERVICE_ALREADY_UNBLOCKED'
        },
        BALANCE_IN_WALLET:{
            statusCode : 400,
            message : 'Dear customer,you do not have sufficient amount in wallet for current booking',
            type : 'BALANCE_IN_WALLET'
        },
        PROMOCODE_ALREADY_CREATED:{
            statusCode : 400,
            message : 'Promo Code already created',
            type : 'PROMOCODE_ALREADY_CREATED'
        },
        PLEASE_ADD_ADDRESS_OF_YOUR_BOOKING:{
            statusCode : 400,
            message : 'Please Add Address of your booking',
            type : 'PLEASE_ADD_ADDRESS_OF_YOUR_BOOKING'
        },
        NO_BOOKINGS_FOUND_RELATED_TO_THIS_TOOKAN_JOB_ID:{
            statusCode : 400,
            message : 'No bookings found for this tookan job_id',
            type : 'NO_BOOKINGS_FOUND_RELATED_TO_THIS_TOOKAN_JOB_ID'
        },
        NOT_GETTING_RESPONSE_FROM_TOOKAN:{
            statusCode : 400,
            message : 'Not getting response from server',
            type : 'NOT_GETTING_RESPONSE_FROM_TOOKAN'
        },
        YOU_CANNOT_USE_THIS_REFER_CODE:{
            statusCode : 400,
            message : 'You cannot use your own referral code',
            type : 'YOU_CANNOT_USE_THIS_REFER_CODE'
        },
        TOOKAN_ERROR:{
            statusCode : 400,
            message : 'Error from tookan',
            type : 'TOOKAN_ERROR'
        },
        SERVICE_NOT_AVAILABLE_AT_THIS_ADDRESS:{
            statusCode : 400,
            message : 'Service not available at the selected address',
            type : 'SERVICE_NOT_AVAILABLE_AT_THIS_ADDRESS'
        },
        EVENT_DATE_SHOULD_BE_FUTURE_DATES:{
            statusCode : 400,
            message : 'Event date should not be past date',
            type : 'EVENT_DATE_SHOULD_BE_FUTURE_DATES'
        },
        WRONG_CATEGORY_ID:{
            statusCode : 400,
            message : 'You entered wrong category id',
            type : 'WRONG_CATEGORY_ID'
        },
        NO_SERVICES_UNDER_THIS_CATEGORY:{
            statusCode : 400,
            message : 'No services are provided under this category',
            type : 'NO_SERVICES_UNDER_THIS_CATEGORY'
        },
        NO_SERVICES_AT_THIS_LOCATION:{
            statusCode : 400,
            message : "We're gearing up to come to your location soon. In the mean time, you can try our services when you are in Mumbai",
            type : 'NO_SERVICES_AT_THIS_LOCATION'
        },
        ALREADY_ADDED_SUBCATEGORY:{
            statusCode : 400,
            message : 'This sub category is already added',
            type : 'ALREADY_ADDED_SUBCATEGORY'
        },
        ALREADY_ADDED_SUBSERVICE:{
            statusCode : 400,
            message : 'This sub service is already added',
            type : 'ALREADY_ADDED_SUBSERVICE'
        },
        SUBCATEGORY_DOES_NOT_EXIST:{
            statusCode : 400,
            message : 'SubCategory Does not exist',
            type : 'SUBCATEGORY_DOES_NOT_EXIST'
        },
        SUBSERVICE_DOES_NOT_EXIST:{
            statusCode : 400,
            message : 'SubService Does not exist',
            type : 'SUBSERVICE_DOES_NOT_EXIST'
        },
        CATEGORY_ALREADY_BLOCKED:{
            statusCode: 400,
            message: 'Category already blocked',
            type: 'CATEGORY_ALREADY_BLOCKED'
        },
        SUBCATEGORY_ALREADY_BLOCKED:{
            statusCode: 400,
            message: 'Category already blocked',
            type: 'SUBCATEGORY_ALREADY_BLOCKED'
        },
        SUBSERVICE_ALREADY_BLOCKED:{
            statusCode: 400,
            message: 'Sub Service already blocked',
            type: 'SUBSERVICE_ALREADY_BLOCKED'
        },
        INCORRECT_OLD_PASS:{
            statusCode: 400,
            message: 'You have entered wrong old password',
            type: 'INCORRECT_OLD_PASS'
        },
        GOOGLE_ID_NOT_FOUND:{
            statusCode: 402,
            message: 'Seems like you have not registered with HOME SALON',
            type: 'GOOGLE_ID_NOT_FOUND'
        },
        GOOGLE_ID_PASSWORD_ERROR:{
            statusCode: 400,
            message: 'Only one field should be filled at a time, either googleId or password',
            type: 'GOOGLE_ID_PASSWORD_ERROR'
        },
        DUPLICATE_GOOGLE_ID:{
            statusCode: 402,
            message: 'You are already registered with us.',
            type: 'DUPLICATE_GOOGLE_ID'
        },
        POINT_DOES_NOT_LIES_INSIDE_GEOFENCE:{
            statusCode:400,
            message:'This point does not lie in any geofence ',
            type:'POINT_DOES_NOT_LIES_INSIDE_GEOFENCE'
        },
        WRONG_GEOFENCE_ID:{
            statusCode:400,
            message:'Please enter valid GEOFENCE ID',
            type:'WRONG_GEOFENCE_ID'
        },
        POLYGON_INTERSECTS:{
            statusCode:400,
            message:'Polygon intersects',
            type:'POLYGON_INTERSECTS'
        },
        ALREADY_COMPLETED:{
            statusCode:405,
            message:'Already completed the booking',
            type:'ALREADY_COMPLETED'
        },
        PLEASE_PAYPAL_ID:{
            statusCode:400,
            message:'Please paypal Id to your account',
            type:'PLEASE_PAYPAL_ID'
        },
        ALREADY_ARRIVED:{
            statusCode:400,
            message:'Seems like you have already arrived at booking address',
            type:'ALREADY_ARRIVED'
        },
        PROMOCODE_MAXUSAGE:{
            statusCode:400,
            message:'Promocode expired or max limit reached',
            type:'PROMOCODE_MAXUSAGE'
        },
        PROMOCODE_INVALID:{
            statusCode:400,
            message:'Sorry! This promo code is no longer valid.',
            type:'PROMOCODE_INVALID'
        },
        NOT_ARRIVED:{
            statusCode:400,
            message:'Sorry,Seems like you have not arrived at booking address',
            type:'NOT_ARRIVED'
        },
        ALREADY_CANCELLED:{
            statusCode:400,
            message:'Already cancelled',
            type:'ALREADY_CANCELLED'
        },
        BOOKING_FULL:{
            statusCode: 404,
            message: "No more service Providers required.Booking full",
            type : "BOOKING_FULL"
        },
        NO_BOOKINGS_FOUND : {
            statusCode: 400,
            message: "Bookings not found",
            type : "NO_BOOKINGS_FOUND"
        },
        SERVICE_NOT_FOUND:{
            statusCode: 400,
            message: "Service not found",
            type : "SERVICE_NOT_FOUND"
        },
        VERIFICATION_CODE_NOT_CORRECT:{
            statusCode: 400,
            message: "Verification code not correct",
            type : "VERIFICATION_CODE_NOT_CORRECT"
        },
        INVALID_PASSWORD:{
            statusCode: 400,
            message: "Invalid Password",
            type : "INVALID_PASSWORD"
        },
        SERVICE_ALREADY_EXIST:{
            statusCode: 409,
            message: "Service already exist",
            type : "SERVICE_ALREADY_EXIST"
        },
        NO_SERVICE_PROVIDERS_FOUND:{
            statusCode: 400,
            message: "No service providers found",
            type : "NO_SERVICE_PROVIDERS_FOUND"
        },
        SERVICE_ALREADY_BLOCKED :{
            statusCode: 400,
            message: "Service is already blocked.",
            type : "SERVICE_ALREADY_BLOCKED"
        },
        SAME_CATEGORY_NAME_EXIST:{
            statusCode : 400,
            message : 'Same category name exist',
            type : 'SAME_CATEGORY_NAME_EXIST'
        },
        CATEGORY_DOES_NOT_EXIST:{
            statusCode : 400,
            message : 'Category Does not exist',
            type : 'CATEGORY_DOES_NOT_EXIST'
        },
        SAME_SERVICE_NAME_EXIST:{
            statusCode : 400,
            message : 'Same service name exist',
            type : 'SAME_SERVICE_NAME_EXIST'
        },
        ALREADY_ADDED_CATEGORY :{
            statusCode : 400,
            message : 'This category is already added',
            type : 'ALREADY_ADDED_CATEGORY'
        },
        NO_SERVICE_DEFINED : {
            statusCode : 400,
            message : 'No service defined like this',
            type : 'NO_SERVICE_DEFINED'
        },
        ALREADY_REFERED : {
            statusCode : 400,
            message : 'Already Refered by some other registered user',
            type : 'ALREADY REFERED'
        },
        INVALID_BOOKING:{
            statusCode: 400,
            message: 'Please enter valid booking Id.',
            type: 'INVALID_BOOKING'
        },
        INVALID_OTP:{
            statusCode: 400,
            message: 'OTP is invalid',
            type: 'INVALID_OTP'
        },
        EXPIRED_OTP:{
            statusCode: 400,
            message: 'OTP has Expired',
            type: 'EXPIRED_OTP'
        },
        ALREADY_USED_PHONENUMBER:{
            statusCode: 400,
            message: 'Phone Number is already in use.',
            type: 'ALREADY_USED_PHONENUMBER'
        },
        ALREADY_UNBLOCKED: {
            statusCode: 400,
            message: 'User already unblocked',
            type: 'ALREADY_UNBLOCKED'
        },
        ALREADY_BLOCKED: {
            statusCode: 400,
            message: 'User already blocked',
            type: 'ALREADY_BLOCKED'
        },
        PAYMENT_CARD_ERROR: {
            statusCode: 400,
            message: 'Payment Card Error.',
            type: 'PAYMENT_CARD_ERROR'
        },
        INCORRECT_USERNAME: {
            statusCode: 400,
            message: 'Username not registered with us.',
            type: 'INCORRECT_USERNAME'
        },
        ADMIN_ALREADY_REGISTERED: {
            statusCode: 400,
            message: 'Admin already registered with this username.',
            type: 'ADMIN_ALREADY_REGISTERED'
        },
        ALREADY_REJECTED: {
            statusCode: 400,
            message: 'Already rejected booking . Now cannot accept',
            type: 'ALREADY_REJECTED'
        },
        INVALID_LAT: {
            statusCode: 400,
            message: 'Invalid latitude and longitude.',
            type: 'INVALID_LAT'
        },
        NO_BOOKINGS: {
            statusCode: 400,
            message: 'No Bookings for you.',
            type: 'NO_BOOKINGS'
        },
        NO_RECEIVED: {
            statusCode: 400,
            message: 'Not received any gift Card.',
            type: 'NO_RECEIVED'
        },
        TOKEN: {
            statusCode: 400,
            message: 'Please enter valid token.',
            type: 'TOKEN'
        },
        NOT_SERVICE: {
            statusCode: 400,
            message: 'Sorry!! Prices are not set at this location. You can select any other massage.',
            type: ' NOT_SERVICE'
        },
        SERVICE_INVALID : {
            statusCode: 400,
            message: 'Please enter valid service Id',
            type: ' SERVICE_INVALID'
        },
        ALREADY_DELETE: {
            statusCode: 400,
            message: 'Already a deleted address',
            type: 'ALREADY_DELETE'
        },
        ALREADY_ACCEPTED: {
            statusCode: 400,
            message: 'You have already accepted this booking.',
            type: 'ALREADY_ACCEPTED'
        },
        ALREADY_BUSY: {
            statusCode: 400,
            message: 'You have already accepted booking for same time',
            type: 'ALREADY_BUSY'
        },
        ALREADY_CLAIMED_JOB: {
            statusCode: 400,
            message: 'This job is now not in accepted state.',
            type: 'ALREADY_CLAIMED_JOB'
        },
        ALREADY_COMPLETED_JOB: {
            statusCode: 400,
            message: 'Already Completed Job.',
            type: 'ALREADY_COMPLETED_JOB'
        },
        INVALID_ACTION_ADDRESS: {
            statusCode: 400,
            message: 'Address Id does not exists.',
            type: 'INVALID_ACTION'
        },
        DEFAULT_NOT_DELETE: {
            statusCode: 400,
            message: 'You cannot delete default Address.',
            type: ' DEFAULT_NOT_DELETE'
        },
        DEFAULTCARD_NOT_DELETE: {
            statusCode: 400,
            message: 'You cannot delete default card.',
            type: 'DEFAULTCARD_NOT_DELETE'
        },
        INVALID_ACTION: {
            statusCode: 400,
            message: 'Invalid Action',
            type: 'INVALID_ACTION'
        },
        NOT_DELETED: {
            statusCode: 400,
            message: 'Unable To Delete.',
            type: 'NOT_DELETED'
        },
        ALREADY_DELETED: {
            statusCode: 400,
            message: 'Card Already Deleted.',
            type: 'ALREADY_DELETED'
        },
        SET_DEFAULT_ERROR: {
            statusCode: 400,
            message: 'Unable to set this as default',
            type: 'SET_DEFAULT_ERROR'
        },
        INVALID_CARD: {
            statusCode: 400,
            message: 'Please Enter valid card details.',
            type: 'INVALID_CARD'
        },
        INCORRECT_ACCESSTOKEN: {
            statusCode: 403,
            message: 'Incorrect AccessToken',
            type: 'INCORRECT_ACCESSTOKEN'
        },
        EMAIL_DOMAIN_ERROR: {
            statusCode: 400,
            message: 'Please enter valid Email Address',
            type: 'EMAIL_DOMAIN_ERROR'
        },
        USER_ALREADY_REGISTERED: {
            statusCode: 400,
            message: 'This Mobile Number is already registered with HOME SALON.',
            type: 'USER_ALREADY_REGISTERED'
        },
        DUPLICATE_FACEBOOK_ID: {
            statusCode: 402,
            message: 'You are already registered with us.',
            type: 'DUPLICATE_FACEBOOK_ID'
        },
        NOT_UPDATED: {
            statusCode: 501,
            message: 'Unable To Update',
            type: 'NOT_UPDATED'
        },
        NOT_UPDATE: {
            statusCode: 401,
            message: 'New password must be different from old password',
            type: 'NOT_UPDATE'
        },
        WRONG_PASSWORD: {
            statusCode: 400,
            message: 'Invalid old password',
            type: 'WRONG_PASSWORD'
        },
        USER_NOT_FOUND: {
            statusCode: 400,
            message: 'User not found.',
            type: 'USER_NOT_FOUND'
        },
        NOT_VERFIFIED: {
            statusCode: 400,
            message: 'User Not Verified',
            type: 'NOT_VERFIFIED'
        },
        INCORRECT_ID: {
            statusCode: 400,
            message: 'Incorrect User',
            type: 'INCORRECT_ID'
        },
        INCORRECT_MOBILE: {
            statusCode: 400,
            message: 'Incorrect Mobile Number',
            type: 'INCORRECT_MOBILE'
        },
        INVALID_USER_PASS: {
            statusCode: 400,
            type: 'INVALID_USER_PASS',
            message: 'Invalid username or password'
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode: 400,
            message: 'Token Already Expired',
            type: 'TOKEN_ALREADY_EXPIRED'
        },
        BLOCK_USER:{
            statusCode: 400,
            message: 'You are blocked by admin.',
            type: 'BLOCK_USER'
        },
        DB_ERROR: {
            statusCode: 400,
            message: 'DB Error',
            type: 'DB_ERROR'
        },
        INVALID_ID: {
            statusCode: 400,
            message: 'Invalid Id Provided : ',
            type: 'INVALID_ID'
        },
        ADMIN_USERNAME:{
            statusCode: 400,
            message: 'Please register with some another userName. You are already registered with this userName.',
            type: 'ADMIN_USERNAME'
        },
        APP_ERROR: {
            statusCode: 400,
            message: 'Application Error',
            type: 'APP_ERROR'
        },
        CANNOT_END:{
            statusCode: 400,
            message: 'You cannot end this service now',
            type: 'CANNOT_END'
        },
        CANNOT_START_TIME_ISSUE:{
            statusCode: 400,
            message: 'You cannot start this service at this time',
            type: 'CANNOT_START_TIME_ISSUE'
        },
        CANNOT_START: {
            statusCode: 400,
            message: 'You cannot start this service now.',
            type: 'CANNOT_START'
        },
        ADDRESS_NOT_FOUND: {
            statusCode: 400,
            message: 'Address not found',
            type: 'ADDRESS_NOT_FOUND'
        },
        ADDRESS_DELETED: {
            statusCode: 400,
            message: 'this address was deleted by you. Please enter valid address',
            type: ' ADDRESS_DELETED'
        },
        CARD_DELETED: {
            statusCode: 400,
            message: 'this card was deleted by you. Please enter valid card',
            type: ' CARD_DELETED'
        },
        NOT_ASSIGNED: {
            statusCode: 400,
            message: 'BOOKING NOT ASSIGNED TO YOU',
            type: 'NOT_ASSIGNED'
        },
        IMP_ERROR: {
            statusCode: 500,
            message: 'Implementation Error',
            type: 'IMP_ERROR'
        },
        APP_VERSION_ERROR: {
            statusCode: 400,
            message: 'One of the latest version or updated version value must be present',
            type: 'APP_VERSION_ERROR'
        },
        INVALID_TOKEN: {
            statusCode: 400,
            message: 'Invalid token provided',
            type: 'INVALID_TOKEN'
        },
        INVALID_CODE: {
            statusCode: 400,
            message: 'Please enter correct verification Code.',
            type: 'INVALID_CODE'
        },
        DEFAULT: {
            statusCode: 400,
            message: 'Error',
            type: 'DEFAULT'
        },
        INVALID_DATES: {
            statusCode: 400,
            message: 'Please enter valid dates according to massageTime',
            type: 'INVALID_DATES'
        },
        WRONG_ID: {
            statusCode: 400,
            message: 'Please enter valid booking Id',
            type: 'WRONG_ID'
        },
        WRONG_PROMOID: {
            statusCode: 400,
            message: 'Please enter valid promo Id',
            type: 'WRONG_PROMOID'
        },
        DELETE_CARD: {
            statusCode: 400,
            message: 'You cannot make booking with deleted card.',
            type: 'DELETE_CARD'
        },
        PAYPAL_DELETE_CARD_ERROR:{
            statusCode:400,
            message:'Invalid card detials',
            type:'PAYPAL_DELETE_CARD_ERROR'
        },
        PHONE_NO_EXIST: {
            statusCode: 400,
            message: 'Mobile No Already Exist',
            type: 'PHONE_NO_EXIST'
        },
        PHONE_VERIFICATION: {
            statusCode: 400,
            message: 'You are not registered with us.',
            type: 'PHONE_VERIFICATION'
        },
        PHONE_VERIFICATION_COMPLETE: {
            statusCode: 400,
            message: 'Your mobile number verification is already completed.',
            type: 'PHONE_VERIFICATION_COMPLETE'
        },
        EMAIL_EXIST: {
            statusCode: 400,
            message: 'Email Already Exist',
            type: 'EMAIL_EXIST'
        },
        DUPLICATE: {
            statusCode: 400,
            message: 'Duplicate Entry',
            type: 'DUPLICATE'
        },
        UNIQUE_CODE_LIMIT_REACHED: {
            statusCode: 400,
            message: 'Cannot Generate Unique Code, All combinations are used',
            type: 'UNIQUE_CODE_LIMIT_REACHED'
        },
        INVALID_REFERRAL_CODE: {
            statusCode: 400,
            message: 'Invalid Referral Code',
            type: 'INVALID_REFERRAL_CODE'
        },
        FACEBOOK_ID_PASSWORD_ERROR: {
            statusCode: 400,
            message: 'Only one field should be filled at a time, either facebookId or password',
            type: 'FACEBOOK_ID_PASSWORD_ERROR'
        },
        INVALID_EMAIL: {
            statusCode: 400,
            message: 'Invalid Email Address',
            type: 'INVALID_EMAIL'
        },
        PASSWORD_REQUIRED: {
            statusCode: 400,
            message: 'Password is required',
            type: 'PASSWORD_REQUIRED'
        },
        INVALID_COUNTRY_CODE: {
            statusCode: 400,
            message: 'Invalid Country Code, Should be in the format +52',
            type: 'INVALID_COUNTRY_CODE'
        },
        INVALID_PHONE_NO_FORMAT: {
            statusCode: 400,
            message: 'Phone no. cannot start with 0',
            type: 'INVALID_PHONE_NO_FORMAT'
        },
        COUNTRY_CODE_MISSING: {
            statusCode: 400,
            message: 'You forgot to enter the country code',
            type: 'COUNTRY_CODE_MISSING'
        },
        INVALID_PHONE_NO: {
            statusCode: 400,
            message: 'Phone No. & Country Code does not match to which the OTP was sent',
            type: 'INVALID_PHONE_NO'
        },
        PHONE_NO_MISSING: {
            statusCode: 400,
            message: 'You forgot to enter the phone no.',
            type: 'PHONE_NO_MISSING'
        },
        NOT_FOUND: {
            statusCode: 400,
            message: 'User Not Found',
            type: 'NOT_FOUND'
        },
        INVALID_RESET_PASSWORD_TOKEN: {
            statusCode: 400,
            message: 'Invalid Reset Password Token',
            type: 'INVALID_RESET_PASSWORD_TOKEN'
        },
        INCORRECT_PASSWORD: {
            statusCode: 400,
            message: 'Incorrect Password',
            type: 'INCORRECT_PASSWORD'
        },
        EMPTY_VALUE: {
            statusCode: 400,
            message: 'Empty String Not Allowed',
            type: 'EMPTY_VALUE'
        },
        PHONE_NOT_MATCH: {
            statusCode: 400,
            message: "Phone No. Doesn't Match",
            type: 'PHONE_NOT_MATCH'
        },
        SAME_PASSWORD: {
            statusCode: 400,
            message: 'Old password and new password are same',
            type: 'SAME_PASSWORD'
        },
        COMPANY_NAME: {
            statusCode: 400,
            message: 'Same Company name. Choose different name.',
            type: 'COMPANY_NAME'
        },
        SCHEDULE_DATE: {
            statusCode: 400,
            message: 'Service available on future dates.',
            type: 'SCHEDULE_DATE'
        },
        EMAIL_ALREADY_EXIST: {
            statusCode: 400,
            message: 'Email Address Already Exists',
            type: 'EMAIL_ALREADY_EXIST'
        },
        ERROR_PROFILE_PIC_UPLOAD: {
            statusCode: 400,
            message: 'Profile pic is not a valid file',
            type: 'ERROR_PROFILE_PIC_UPLOAD'
        },
        PHONE_ALREADY_EXIST: {
            statusCode: 400,
            message: 'Phone No. Already Exists',
            type: 'PHONE_ALREADY_EXIST'
        },
        EMAIL_NOT_FOUND: {
            statusCode: 400,
            message: 'Email Not Found',
            type: 'EMAIL_NOT_FOUND'
        },
        FACEBOOK_ID_NOT_FOUND: {
            statusCode: 402,
            message: 'Seems like you have not registered with HOME SALON',
            type: 'FACEBOOK_ID_NOT_FOUND'
        },
        PHONE_NOT_FOUND: {
            statusCode: 400,
            message: 'Phone Number Not Found',
            type: 'PHONE_NOT_FOUND'
        },
        UNAUTHORIZED: {
            statusCode: 401,
            message: 'You are not authorized to perform this action',
            type: 'UNAUTHORIZED'
        },
        PHONENUMBER_NOT_REGISTERED: {
            statusCode: 400,
            message: 'Mobile Number is not registered with us',
            type: 'PHONENUMBER_NOT_REGISTERED'
        },
        NOT_CANCEL: {
            statusCode: 400,
            message: 'You cannot cancel this booking.',
            type: 'NOT_CANCEL'
        }
    },
    SUCCESS: {
        FORGOT_PASSWORD:{
            statusCode: 200,
            message: "Link sent to EmailId",
            type:'FORGOT_PASSWORD',
            data:''
        },
        LOGGED_IN_SUCCESSFULLY:{
            statusCode: 200,
            message: "Logged in",
            type:'LOGGED_IN_SUCCESSFULLY',
            data:''
        },
        CUSTOMER_ADDED:{
            statusCode: 200,
            message: "Customer added",
            type:'CUSTOMER_ADDED',
            data:''
        },
        SUBSERVICE_UNBLOCKED:{
            statusCode: 200,
            message: "SubService unblocked",
            type:'SUBSERVICE_UNBLOCKED'
        },
        SUBCATEGORY_UNBLOCKED:{
            statusCode: 200,
            message: "SubCategory unblocked",
            type:'SUBCATEGORY_UNBLOCKED'
        },
        CATEGORY_UNBLOCKED:{
            statusCode: 200,
            message: "Category unblocked",
            type:'CATEGORY_UNBLOCKED'
        },
        SERVICE_UNBLOCKED:{
            statusCode: 200,
            message: "Service unblocked",
            type:'SERVICE_UNBLOCKED'
        },
        CATEGORY_BLOCKED:{
            statusCode: 200,
            message: "Category blocked",
            type:'CATEGORY_BLOCKED'
        },
        CATEGORY_UPDATED:{
            statusCode: 201,
            message: "Category updated",
            type:'CATEGORY_UPDATED'
        },
        LAT_LONG_UPDATED:{
            statusCode: 201,
            message: "Lat long updated",
            type:'LAT_LONG_UPDATED'
        },
        DEFAULT_CARD_UPDATED:{
            statusCode: 201,
            message: "Default Card added",
            type:'DEFAULT_CARD_UPDATED'
        },
        REFER:{
            statusCode: 201,
            message: "Refer code has been generated",
            type:'REFER'
        },
        CARD_ADDED:{
            statusCode: 201,
            message: "Card added",
            type:'CARD_ADDED'
        },
        DOCUMENT:{
            statusCode: 201,
            message: "Document uploaded successfully",
            type:'DOCUMENT'
        },
        FAV_SERVICES_ADDED:{
            statusCode: 201,
            message: "Favorite services added",
            type:'FAV_SERVICES_ADDED'
        },
        SERVICE_ADDED:{
            statusCode: 201,
            message: "Service added",
            type:'SERVICE_ADDED'
        },
        CATEGORY_ADDED:{
            statusCode: 201,
            message: "Category added",
            type:'CATEGORY_ADDED'
        },
        TOKENS_UPDATED:{
            statusCode: 200,
            message: "Tokens updated",
            type:'TOKENS_UPDATED'
        },
        SERVICE_UPDATED:{
            statusCode: 200,
            message: "Service is updated",
            type:'SERVICE_UPDATED'
        },
        SERVICE_BLOCKED:{
            statusCode: 200,
            message: "Service is blocked",
            type:'SERVICE_BLOCKED'
        },
        GET_PROFILE:{
            statusCode:200,
            message : 'PROFILE OF SERVICE PROVIDER',
            type:'GET_PROFILE'
        },
        REFERED_SAVED:{
            statusCode:201,
            message : 'Refer code is saved',
            type:'REFERED_SAVED'
        },
        USER_UNBLOCKED: {
            statusCode: 200,
            message: 'User unblocked successfully',
            type: 'USER_UNBLOCKED'
        },
        USER_BLOCKED: {
            statusCode: 200,
            message: 'User blocked successfully',
            type: 'USER_BLOCKED'
        },
        REVIEW_SAVED: {
            statusCode: 200,
            message: 'Feedback saved successfully.',
            type: 'REVIEW_SAVED'
        },
        ADDRESS_DELETE: {
            statusCode: 200,
            message: 'Address deleted successfully.',
            type: 'ADDRESS_DELETE'
        },
        ADDRESS_CREATE: {
            statusCode: 200,
            message: 'Address added successfully.',
            type: 'ADDRESS_CREATE'
        },
        ADDRESS_EDIT: {
            statusCode: 200,
            message: 'Address updated successfully.',
            type: 'ADDRESS_EDIT'
        },
        CARD_DELETED: {
            statusCode: 200,
            message: 'Card deleted successfully',
            type: 'CARD_DELETED'
        },
        VERIFY_COMPLETE: {
            statusCode: 200,
            message: 'One Time Password verification is completed.',
            type: 'VERIFY_SENT'
        },
        PASSWORD_RESET: {
            statusCode: 200,
            message: 'Password Reset Successfully',
            type: 'PASSWORD_RESET'
        },
        PASSWORD_CHANGED: {
            statusCode: 200,
            message: 'Password changed successfully',
            type: 'PASSWORD_CHANGED'
        },
        VERIFY_SENT: {
            statusCode: 200,
            message: 'One Time Password has been sent to your mobile number.',
            type: 'VERIFY_SENT'
        },
        VERIFY_RESENT: {
            statusCode: 200,
            message: 'One Time Password has been resent to your mobile number.',
            type: 'VERIFY_RESENT'
        },
        CREATED: {
            statusCode: 201,
            message: 'Created Successfully',
            type: 'CREATED'
        },
        DEFAULT: {
            statusCode: 200,
            message: 'Success',
            type: 'DEFAULT'
        },
        UPDATED: {
            statusCode: 200,
            message: 'Updated Successfully',
            type: 'UPDATED'
        },
        LOGOUT: {
            statusCode: 200,
            message: 'Logged Out Successfully',
            type: 'LOGOUT',
            data:''
        },
        DELETED: {
            statusCode: 200,
            message: 'Deleted Successfully',
            type: 'DELETED'
        },
        ADDRESS_NOT_FOUND: {
            statusCode: 200,
            message: 'Address not found.',
            type: 'ADDRESS_NOT_FOUND'
        }
    }
};

const FCM_KEY = "";

const EXPIRATION_TIME_OF_TOKEN = 1440 * 60 ;      //60 days

module.exports = {
    ADMIN_TYPES : ADMIN_TYPES,
    SWAGGER_BASE_LINK : SWAGGER_BASE_LINK,
    STATUS_MSG : STATUS_MSG,
    BOOKING_STATUS : BOOKING_STATUS,
    DEVICE_TYPES:DEVICE_TYPES,
    PAYMENT:PAYMENT,
    DATABASE:DATABASE,
    JWT_SECRET_KEY:JWT_SECRET_KEY,
    APP_NAME:APP_NAME,
    FCM_KEY : FCM_KEY,
    EXPIRATION_TIME_OF_TOKEN:EXPIRATION_TIME_OF_TOKEN
};