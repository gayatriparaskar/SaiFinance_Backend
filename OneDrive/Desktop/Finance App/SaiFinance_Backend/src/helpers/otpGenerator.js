// otpGenerator.js
const crypto = require("crypto");

function generateOTP(length) {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const index = crypto.randomInt(0, digits.length);
    otp += digits[index];
  }

  return otp;
}

// console.log(generateOTP(5));
module.exports = generateOTP;
