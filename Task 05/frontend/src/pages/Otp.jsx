import { useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app, auth } from "../firebase";
import PhoneInput from "react-phone-input-2";
import firebase from "../firebase.config.js";

const Otp = () => {
  const [phone, setPhone] = useState(null);
  const [toast, setToast] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaRef = useRef(null);
  // const handlePhoneSignin = () => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container", // ID of the reCAPTCHA container
  //       {
  //         size: "invisible", // Makes the reCAPTCHA invisible
  //         callback: (response) => {
  //           onSignup(); // Automatically triggers the onSignup function after verification
  //         },
  //         "expired-callback": () => {
  //           console.warn("Recaptcha expired, please try again.");
  //         },
  //       },
  //       auth // This is your initialized auth object
  //     );

  //     // Render the reCAPTCHA to ensure it’s set up
  //     window.recaptchaVerifier.render().then((widgetId) => {
  //       window.recaptchaWidgetId = widgetId;
  //     });
  //   }
  // };

  // const onSignup = () => {
  //   handlePhoneSignin();
  //   const appVerifier = window.recaptchaVerifier;
  //   const formatedPhone = `+${phone}`;
  //   signInWithPhoneNumber(auth, formatedPhone, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       setToast("OTP sent successfully");
  //     })
  //     .catch((error) => {
  //       console.error("error: ", error);
  //       setToast(error?.message);
  //     });
  // };

  const handleSendOtp = () => {
    if (recaptchaRef.current) {
    }
    const verifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        // callback: (response) => {
        //   handleSubmit(response);
        // },
        // "expired-callback": () => {
        //   console.warn("Recaptcha expired, please try again.");
        // },
      }
    );
    const formatedPhone = `+${phone}`;
    firebase
      .auth()
      .signInWithPhoneNumber(formatedPhone, verifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="inputDiv">
        <div id="recaptcha-container" ref={recaptchaRef}></div>
        <PhoneInput country={"pk"} value={phone} onChange={setPhone} />
      </div>
      {toast && <h1>OTP sent successfully</h1>}
      {phone && <p>Your phone number is: +{phone}</p>}
      <button onClick={handleSendOtp}>Send OTP</button>
    </>
  );
};

export default Otp;
