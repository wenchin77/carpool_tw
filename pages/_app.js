import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  function openInDefaultBrowser() {
    if (window.opener === null) {
      console.log("website opened in a default browser");
      return;
    }
    alert("請以預設網路瀏覽器 (Chrome, Safari...) 開啟這個網頁，才能成功使用 Google 登入！")
    console.log("website opened in a web-embedded browser");
    const newWindow = window.open(window.location.href, "_blank");
    newWindow.opener = null;
  }

  useEffect(() => {
    openInDefaultBrowser();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
