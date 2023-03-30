import { useState } from "react";
import Link from "next/link";
import TermsModal from "@/components/TermsPopup";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  function handleTermsClick() {
    setIsTermsModalOpen(true);
  }
  function handleTermsClose() {
    setIsTermsModalOpen(false);
  }
  function handleContactClick() {
    // TODO
    alert("還沒寫好");
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.footer_nav}>
          <ul className={styles.footer_links}>
            <li>
              <Link href="#" onClick={handleContactClick}>
                聯絡我
              </Link>
            </li>
            <li>
              <Link href="#" onClick={handleTermsClick}>
                共乘法規
              </Link>
            </li>
          </ul>
        </nav>
        <p className={styles.footer_copy}>
          &copy; 2023 CarpoolTW. All rights reserved.
        </p>
      </div>
      <TermsModal isOpen={isTermsModalOpen} onClose={handleTermsClose} />
    </footer>
  );
}
