const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const COUNTRY_CODE = "CA";

module.exports.parse = function (phoneNumber) {
    return new Promise((resolve, reject) => {
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, COUNTRY_CODE);
        if (isValid(number)){
            const formattedNumber = phoneUtil.format(number, PNF.NATIONAL);
            resolve(formattedNumber);
        } else {
            reject("Phone is invalid")
        }
    })
}

module.exports.parseFile = function (data) {
    let validPhones = [];
    return new Promise((resolve, reject) => {   
        for(i = 0; i < data.length; i++){
            console.log(data[i]);
            const number = phoneUtil.parseAndKeepRawInput(data[i], COUNTRY_CODE);
            if (isValid(number)) {
                validPhones.push(phoneUtil.format(number, PNF.NATIONAL));
            }
        }     
        if(validPhones){
            resolve(validPhones);
        }else{
            reject("No Valid Phones found");
        }
    })
}


function isValid(number){
    return phoneUtil.isPossibleNumber(number) && phoneUtil.isValidNumber(number) && phoneUtil.isValidNumberForRegion(number, COUNTRY_CODE)
}