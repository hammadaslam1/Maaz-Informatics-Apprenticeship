import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import PhoneInput from "react-phone-input-2";

const Otp = () => {
  const [phone, setPhone] = useState(null);
  const [toast, setToast] = useState(null);
  const handlePhoneSignin = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // ID of the reCAPTCHA container
        {
          size: "invisible", // Makes the reCAPTCHA invisible
          callback: (response) => {
            onSignup(); // Automatically triggers the onSignup function after verification
          },
          "expired-callback": () => {
            console.warn("Recaptcha expired, please try again.");
          },
        },
        auth // This is your initialized auth object
      );

      // Render the reCAPTCHA to ensure it’s set up
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  };

  const onSignup = () => {
    handlePhoneSignin();
    const appVerifier = window.recaptchaVerifier;
    const formatedPhone = `+${phone}`;
    signInWithPhoneNumber(auth, formatedPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setToast("OTP sent successfully");
      })
      .catch((error) => {
        console.error("error: ", error);
        setToast(error?.message);
      });
  };
  return (
    <>
      <div className="inputDiv">
        <div id="recaptcha-container"></div>
        <PhoneInput country={"pk"} value={phone} onChange={setPhone} />
      </div>
      {toast && <h1>OTP sent successfully</h1>}
      {phone && <p>Your phone number is: +{phone}</p>}
      <button onClick={onSignup}>Send OTP</button>
    </>
  );
};

export default Otp;
