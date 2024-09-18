import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = (req, res) => {
  const fcmToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Maaz Informatics",
      body: "May your all wishes come true, but the legal ones.\nHave a nice day.",
    },
    token: fcmToken,
  };
  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};
