import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

const logo = "共乘台灣";

const links = [
  { label: "發布共乘資訊", href: "/publish-a-ride" },
  { label: "我的行程", href: "/my-rides" },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>{logo}</div>
      <ul className={styles.navbar_links}>
        {links.map((link, index) => (
          <li key={index} className={styles.navbar_link}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
