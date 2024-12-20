"use client";

import "./globals.css";
import { Persistor, Store } from "../../lib/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// export const metadata = {
//   title: "Chat App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-hidden`}>
        <PersistGate loading={null} persistor={Persistor}>
          <Provider store={Store}>{children}</Provider>
        </PersistGate>
      </body>
    </html>
  );
}
