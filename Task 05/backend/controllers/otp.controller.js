import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.js";

export const createOtp = async (req, res) => {
  const { phone } = req.body;
  await signInWithPhoneNumber(auth, phone, true)
    .then((response) => {
      console.log(window.confirmationResult);
      const otp = response.authCredential.accessToken.split(":")[1];
      console.log(otp);
      res.status(200).json({ otp });
    })
    .catch((error) => {
      console.log("Error signing in with phone number: ", error);
      res.status(500).json({ error: error.message });
    });
};
