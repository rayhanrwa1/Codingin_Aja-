import React, { useState, useEffect } from "react";
import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import HeaderTwo from "@/src/layout/headers/header_3_user";
import TeamDetailsArea from "./team-details-area";
import Footer from "@/src/layout/footers/footer";
import firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../../../Database/Firebase/firebaseInit";

const auth = getAuth(app);

const TeamDetails = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          resetTimer();
        } else {
        }
      });
    };

    checkLoginStatus();

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleLogout();
      }, 5 * 30 * 1000); // 5 menit
    };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        setLoggedIn(false);
        Swal.fire({
          title: "Sesi Habis",
          text: "Silakan login kembali!",
          icon: "question",
        });
        window.location.href = "/login";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return (
    <>
      {loggedIn ? <HeaderTwo /> : <HeaderOne />}
      <main>
        <Breadcrumb
          title="Rayhan Rizky Widi Ananta"
          innertitle="Rayhan Rizky"
        />
        <TeamDetailsArea />
      </main>
      <Footer />
    </>
  );
};

export default TeamDetails;
