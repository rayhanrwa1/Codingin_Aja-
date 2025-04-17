import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../common/seo";
import HeaderOne from "../components/homes/home";
import HeaderTwo from "../components/homes/home2";
import Wrapper from "../layout/wrapper";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Database/Firebase/firebaseInit"; // ✅ Auth langsung dari config

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleLogout();
      }, 60 * 1000); // 1 menit
    };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        resetTimer();
      } else {
        setIsLoggedIn(false);
        clearTimeout(timer);
      }
    });

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    return () => {
      unsubscribe();
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return (
    <Wrapper>
      <SEO pageTitle={"Beranda"} />
      {isLoggedIn ? <HeaderTwo /> : <HeaderOne />}
    </Wrapper>
  );
};

export default Home;
