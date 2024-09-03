import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

import app from "./firebase"; // Import your Firebase app configuration

function OtpForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved - will proceed with OTP sending
          },
          'expired-callback': () => {
            setMessage("reCAPTCHA expired, please try again.");
          },
        },
        auth
      );
    }
  }, [auth]);

  const handleSendOtp = async () => {
    setMessage("");
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    try {
      const recaptchaVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent to your phone number.");
      setIsOtpSent(true);
    } catch (error) {
      setMessage(`Failed to send OTP: ${error.message}`);
      console.error("Error during signInWithPhoneNumber", error);
    }
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    if (!otp || !verificationId) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      setMessage("Phone number verified successfully!");
    } catch (error) {
      setMessage(`Verification failed: ${error.message}`);
      console.error("Error during OTP verification", error);
    }
  };

  return (
    <div>
      <h2>Phone Number Verification</h2>
      <input
        type="text"
        placeholder="Phone Number (e.g., +1234567890)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={isOtpSent}
      />
      {!isOtpSent && <button onClick={handleSendOtp}>Send OTP</button>}

      {isOtpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OtpForm;
