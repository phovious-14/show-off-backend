const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOTP(phoneNumber) {


}

module.exports = { sendOTP };
