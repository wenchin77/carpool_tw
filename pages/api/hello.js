// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { database } from "@/firebase/firebase-config";
import { ref, child, get } from "firebase/database";

const dbRef = ref(database);

async function getData(objectKey) {
  try {
    return await get(child(dbRef, objectKey));
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(req, res) {
  let snapshot = await getData("test");
  if (snapshot.exists()) {
    res.status(200).json({ result: snapshot.val() });
    return;
  }
  res.status(200).json({ result: "No data available" });
}
