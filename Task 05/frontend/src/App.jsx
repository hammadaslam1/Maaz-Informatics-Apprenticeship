import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./App.css";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [phone, setPhone] = useState(null);
  const handlephone = () => {
    alert(phone);
  };
  const handleOtp = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          handlePhoneSignin();
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
  };
  const handlePhoneSignin = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };
  const onSignup = () => {
    handlePhoneSignin();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("error: ", error);
        // Error; SMS not sent
        //...
      });
  };
  return (
    <div className="App App-header">
      <div className="inputDiv">
        <div id="recaptcha-container"></div>
        <PhoneInput country={"pk"} value={phone} onChange={setPhone} />
      </div>
      {/* {phone && <p>Your phone number is: +{phone}</p>} */}
      <button onClick={handlePhoneSignin}>Send OTP</button>
    </div>
  );
}

export default App;
