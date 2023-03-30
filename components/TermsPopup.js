import styles from "@/styles/PopupModal.module.css";

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>共乘法規</h2>
        <div className={styles.modalContentText}>
          <p>
            <b>交通部107年3月15日交路字第1075002889號函：</b>
          </p>
          <p>
            {" "}
            自用車輛共乘係基於個人從事社經活動中產生之必要旅次，由駕駛人或乘客自主發起之互助行為。自用車輛共乘原則如下：
          </p>
          <p>
            1.
            共乘係自用車輛駕駛人不以營利為目的，基於個人從事社經活動中產生之必要旅次、在有空餘座位下提供他人共乘，由駕駛人與乘客以共同分擔該旅次之能源費用及通行費為限，而無營業行為。
          </p>
          <p>
            {" "}
            2.
            自用車輛共乘不得具有每日密集行駛之反覆、繼續性之營業特徵，在前述分攤成本費用之前提下，每日應以兩趟次為限。
          </p>
        </div>
        <button className="secondary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
