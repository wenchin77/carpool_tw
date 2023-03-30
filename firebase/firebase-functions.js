import { ref, child, get } from "firebase/database";
import { database } from "./firebase-config";

const dbRef = ref(database);

export async function getData(objectKey) {
  try {
    return await get(child(dbRef, objectKey));
  } catch (error) {
    console.error(error);
  }
}
