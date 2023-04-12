import { useState } from "react";
import styles from "@/styles/RideCard.module.css";

export default function RideCard({ ride }) {
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = () => {
    alert(
      "這個功能正在開發中！V1 打算開啟表單填寫聯絡方式，由司機決定是否聯絡"
    );
    // TODO
    setIsBooking(true);
  };

  const handleCancelBooking = () => {
    alert("這個功能也正在開發中！這是 ChatGPT 的點子，但 V1 我可能不給你取消");
    // TODO
    setIsBooking(false);
  };

  return (
    <li key={ride.id} className={styles.ride}>
      <div className={styles.ride_locations}>
        <div>
          <h2>
            {ride.from_city}
            {ride.from_dist}
          </h2>
          <p>{ride.from_details}</p>
        </div>
        <h2> → </h2>
        <div>
          <h2>
            {ride.to_city}
            {ride.to_dist}
          </h2>
          <p>{ride.to_details}</p>
        </div>
      </div>
      <p>司機：{ride.driver}</p>
      <p>出發日期：{ride.date}</p>
      <p>出發時間：{ride.time}</p>
      <p>可搭載人數：{ride.seats}</p>
      <p>每位乘客分攤油錢：{ride.price}</p>
      <p>司機想說：{ride.driver_comments}</p>
      {isBooking ? (
        <>
          {/* Show form here */}
          <button className="secondary" onClick={handleCancelBooking}>
            取消申請
          </button>
        </>
      ) : (
        <>
          <button className="primary" onClick={handleBooking}>
            加入共乘
          </button>
        </>
      )}
    </li>
  );
}
