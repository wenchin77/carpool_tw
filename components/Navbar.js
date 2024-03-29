import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
export default function Navbar() {
  const { loading, currentUser, userPhoto, signInWithGoogle, signOutGoogle } =
    useContext(AuthContext);

  // TODO: move 登出 to /profile

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
        ) : currentUser ? (
          <>
            <li className={styles.navbar_link}>
              <Link href="#" onClick={signOutGoogle}>
                登出
              </Link>
            </li>
            {userPhoto ? (
              <li>
                <Link href="/profile">
                  <div className={styles.navbar_profile_photo}>
                    <img src={userPhoto} alt="User Profile" />
                  </div>
                </Link>
              </li>
            ) : (
              <li className={styles.navbar_link}>
                <Link href="/my-rides">我的行程</Link>
              </li>
            )}
          </>
        ) : (
          <li className={styles.navbar_link}>
            <Link href="#" onClick={signInWithGoogle}>
              登入
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
