exports.OtpGenerator = () => {
  let otpGenerator = randomNumberGenerator();
  for (let i = 1; i <= 5; i++) {
    otpGenerator += randomNumberGenerator();
  }
  return otpGenerator;
};
const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 10).toString();
};
