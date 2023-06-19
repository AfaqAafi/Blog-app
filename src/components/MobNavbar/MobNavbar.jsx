"use client";
import React, { useState } from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { FaTimesCircle, FaHamburger } from "react-icons/fa";
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

const MobNavbar = () => {
  const [open, setOpen] = useState(false);
  let session = useSession();
  return (
    <>
      <div className={styles.burger}>
        <Link href="/" className={styles.menu}>
          Afaq_Dev
        </Link>
        <FaHamburger className={styles.menu} onClick={() => setOpen(true)} />
      </div>
      {open && (
        <div className={styles.containerLinks}>
          <div className={styles.modeStyle}>
            <FaTimesCircle
              className={styles.menu}
              onClick={() => setOpen(false)}
            />
            <DarkModeToggle />
          </div>
          <div className={styles.linkInd}>
            {links.map((link) => {
              return (
                <Link
                  href={link.url}
                  key={link.id}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          {session.status === "authenticated" && (
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default MobNavbar;
