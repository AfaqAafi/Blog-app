"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import MobNavbar from "../MobNavbar/MobNavbar";
const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const session = useSession();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <MobNavbar />
      ) : (
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Afaq_Dev
          </Link>
          <div className={styles.links}>
            <DarkModeToggle />
            {links.map((link) => {
              return (
                <Link href={link.url} key={link.id} className={styles.link}>
                  {link.title}
                </Link>
              );
            })}
            {session.status === "authenticated" && (
              <button className={styles.logout} onClick={signOut}>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
