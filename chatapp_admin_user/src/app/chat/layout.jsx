"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      console.log(currentUser);
    }
  }, []);
  return <div>{children}</div>;
};

export default Layout;
