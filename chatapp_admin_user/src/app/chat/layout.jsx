"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const Layout = ({ allusers, chatroom }) => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration (ms)
      once: true, // Animates only once when scrolling down
    });
  }, []);
  return (
    <div className="flex h-screen flex-grow">
      <div className="flex-[2] min-w-72 h-full flex justify-center items-center">
        {allusers}
      </div>
      <div className="w-px bg-gray-500"></div>
      <div className="flex-[5] h-full flex justify-center items-center">
        {chatroom}
      </div>
    </div>
  );
};

export default Layout;
