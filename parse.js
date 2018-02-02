const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const COUNTRY_CODE = "CA";

module.exports.parse = function (phoneNumber){
    return new Promise((resolve, reject)=>{
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, COUNTRY_CODE);
        if(
            phoneUtil.isPossibleNumber(number) && 
            phoneUtil.isValidNumber(number) && 
            phoneUtil.isValidNumberForRegion(number, COUNTRY_CODE)){
            const formattedNumber  = phoneUtil.format(number, PNF.NATIONAL);
            console.log(formattedNumber);
            resolve(formattedNumber);
        }else{
            reject("Phone is invalid")
        }
    })
}

module.exports.parseFile = function(data){

    return new Promise((resolve, reject) =>{
        

    })
}