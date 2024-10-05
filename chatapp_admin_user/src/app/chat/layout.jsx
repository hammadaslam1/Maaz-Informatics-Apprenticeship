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
    <div className="flex flex-col h-screen">
      <header className="bg-red-600 p-6"></header>
      <div className="flex-grow flex">
        <div
          data-aos="fade-right"
          className="flex-[2] min-w-72 bg-red-400 h-full flex justify-center items-center"
        >
          {allusers}
        </div>
        <div
          data-aos="fade-left"
          className="flex-[5] bg-red-100 h-full flex justify-center items-center"
        >
          {chatroom}
        </div>
      </div>
    </div>
  );
};

export default Layout;
