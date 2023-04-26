import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  function openInDefaultBrowser() {
    if (window.self !== window.top) {
      alert(
        "請以預設網路瀏覽器 (Chrome, Safari...) 開啟這個網頁，才能成功使用 Google 登入！"
      );
    }
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
