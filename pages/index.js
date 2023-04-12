import { useState, useEffect } from "react";
import { getDataListen } from "@/firebase/firebase-functions";
import Layout from "@/components/Layout";
import RideCard from "@/components/RideCard";

export default function Home() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    getDataListen("rides", (ridesData) => {
      const ridesArray = Object.keys(ridesData).map((key) => {
        return {
          id: key,
          ...ridesData[key],
        };
      });
      setRides(ridesArray);
    });
  }, []);

  return (
    <Layout title="共乘台灣">
      <h1>所有共乘行程</h1>
      <ul>
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride}></RideCard>
        ))}
      </ul>
    </Layout>
  );
}
