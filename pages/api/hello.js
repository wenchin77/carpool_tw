// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getData } from "@/firebase/firebase-functions";

export default async function handler(req, res) {
  let snapshot = await getData("test");
  if (snapshot.exists()) {
    res.status(200).json({ result: snapshot.val() });
    return;
  }
  res.status(200).json({ result: "No data available" });
}
