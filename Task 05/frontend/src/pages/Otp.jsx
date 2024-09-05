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

  const handleSendOtp = async () => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
    // handlePhoneSignin();
    // const appVerifier = window.recaptchaVerifier;
    const formatedPhone = `+${phone}`;
    await signInWithPhoneNumber(auth, formatedPhone, verifier)
      .then((confirmationResult) => {
        const id = confirmationResult.verificationId;
        setToast("OTP sent successfully");
      })
      .catch((error) => {
        console.error("error: ", error);
        setToast(error?.message);
      });
  };

  // const handleSendOtp = () => {
  //   if (recaptchaRef.current) {
  //   }
  //   const verifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "normal",
  //       // callback: (response) => {
  //       //   handleSubmit(response);
  //       // },
  //       // "expired-callback": () => {
  //       //   console.warn("Recaptcha expired, please try again.");
  //       // },
  //     }
  //   );
  //   const formatedPhone = `+${phone}`;

  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber("+923074304204", verifier)
  //     .then((confirmationResult) => {
  //       setVerificationId(confirmationResult.verificationId);
  //       alert(confirmationResult.verificationId);
  //     })
  //     .catch((error) => {
  //       console.log(verifier);
  //       console.log(error);
  //     });
  // };

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