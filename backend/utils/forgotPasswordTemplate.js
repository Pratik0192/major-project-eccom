const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div>
    <p>Dear ${name},</p>
    <p>You requested a password reset. Use the OTP below:</p>
    <div style="background:yellow; font-size:20px; padding:20px; text-align:center; font-weight:800;">
      ${otp}
    </div>
    <p>This OTP is valid for 1 hour. Enter it on the website to reset your password.</p>
    <br/>
    <p>Thanks,</p>
    <p>Lenskart2.0</p>
  </div>
`;
}

export default forgotPasswordTemplate