import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = (req, res) => {
  console.log(req.body);
  const { fcmToken } = req.body;
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
      console.log("message sent: ", message);

      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(200).json(error);
    });
};
