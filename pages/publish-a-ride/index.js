import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { getDataOnce, setData } from "@/firebase/firebase-functions";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/PublishARide.module.css";

export default function PublishARide() {
  const { currentUser } = useContext(AuthContext);

  const [locations, setLocations] = useState([]);
  const [departureCity, setDepartureCity] = useState("");
  const [departureDist, setDepartureDist] = useState("");
  const [departureDetails, setDepartureDetails] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalDist, setArrivalDist] = useState("");
  const [arrivalDetails, setArrivalDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsData = await getDataOnce("locations");
      setLocations(locationsData);
    };
    fetchLocations();
  }, []);

  const getDistsForCity = (city) => {
    const selectedCity = locations.find(
      (location) => location.city_zh === city
    );
    return selectedCity ? selectedCity.dists : [];
  };

  const cityOptions = locations.map((location) => (
    <option key={location.city_en} value={location.city_zh}>
      {location.city_zh}
    </option>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const rideId = currentUser.uid + Date.now();
    const rideData = {
      driver: currentUser.displayName,
      driver_id: currentUser.uid,
      from_city: departureCity,
      from_dist: departureDist,
      from_details: departureDetails,
      to_city: arrivalCity,
      to_dist: arrivalDist,
      to_details: arrivalDetails,
      date: date,
      time: time,
      seats: seats,
      price: price,
      driver_comments: comments,
      publish_time: Date.now(),
    };

    setData("rides", rideId, rideData);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push("/");
    }, 3000);
  };

  return (
    <Layout title="發布共乘行程 | 共乘台灣">
      {currentUser ? (
        <>
          <h1>找乘客</h1>
          <form className={styles.publish_form} onSubmit={handleSubmit}>
            <label>出發地點：</label>
            <label>
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                required
              >
                <option value="" disabled>
                  請選擇縣市
                </option>
                {cityOptions}
              </select>
              {departureCity && (
                <select
                  value={departureDist}
                  onChange={(e) => setDepartureDist(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    請選擇鄉鎮市區
                  </option>
                  {getDistsForCity(departureCity).map((dist) => (
                    <option key={dist.dist_en} value={dist.dist_zh}>
                      {dist.dist_zh}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label>
              <input
                type="text"
                value={departureDetails}
                placeholder="詳細出發地點（例如：公館商圈附近）"
                onChange={(e) => setDepartureDetails(e.target.value)}
                required
              />
            </label>
            <label>目的地點：</label>
            <label>
              <select
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                required
              >
                <option value="" disabled>
                  請選擇縣市
                </option>
                {cityOptions}
              </select>
              {arrivalCity && (
                <select
                  value={arrivalDist}
                  onChange={(e) => setArrivalDist(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    請選擇鄉鎮市區
                  </option>
                  {getDistsForCity(arrivalCity).map((dist) => (
                    <option key={dist.dist_en} value={dist.dist_zh}>
                      {dist.dist_zh}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label>
              <input
                type="text"
                value={arrivalDetails}
                placeholder="詳細抵達地點（例如：雙獅浪點停車場）"
                onChange={(e) => setArrivalDetails(e.target.value)}
                required
              />
            </label>
            <label>
              出發日期：
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label>
              出發時間：
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
            <label>
              可搭載人數：
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                required
              />
            </label>
            <label>
              每位乘客分攤油錢：
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label>
              想對乘客說的話：
              <input
                type="text"
                value={comments}
                placeholder="例如：上車地點公館附近皆可，車上禁菸、但可吃東西或唱歌"
                onChange={(e) => setComments(e.target.value)}
              />
            </label>
            <button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? "發布中..." : "發布"}
            </button>
          </form>
          {showPopup && <div>成功發布行程！</div>}
        </>
      ) : (
        <div>
          <h1>找乘客</h1>
          <p>請先登入再來發布行程</p>
        </div>
      )}
    </Layout>
  );
}
