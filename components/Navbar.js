import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import { UserContext } from "@/contexts/UserContext";
import { useEffect, useContext } from "react";

export default function Navbar() {
  const { loading, currentUser, handleCredentialResponse } =
    useContext(UserContext);

  const showGoogleLoginButton = () => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  };

  useEffect(() => {
    showGoogleLoginButton();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link href="/">共乘台灣</Link>
      </div>
      <ul className={styles.navbar_links}>
        <li className={styles.navbar_link}>
          <Link href="/">找司機</Link>
        </li>
        <li className={styles.navbar_link}>
          <Link href="/publish-a-ride">找乘客</Link>
        </li>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentUser && (
              <li className={styles.navbar_link}>
                <Link href="/my-rides">我的行程</Link>
              </li>
            )}
            <li className={styles.navbar_link}>
              <div id="buttonDiv"></div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
