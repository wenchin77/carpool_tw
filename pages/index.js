import { useState, useEffect } from "react";
import { getData } from "@/firebase/firebase-functions";
import Layout from "@/components/Layout";
import RideCard from "@/components/RideCard";

export async function getServerSideProps() {
  let ridesSnapshot = await getData("rides");
  let ridesData = ridesSnapshot.val();
  return { props: ridesData };
}

export default function Home(ridesData) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const ridesArray = Object.keys(ridesData).map((key) => {
        return {
          id: key,
          ...ridesData[key],
        };
      });
      setRides(ridesArray);
    };
    fetchRides();
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
