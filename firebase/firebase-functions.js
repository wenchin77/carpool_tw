import { ref, child, get, set } from "firebase/database";
import { database } from "./firebase-config";

export async function getData(objectKey) {
  const dbRef = ref(database);
  try {
    return await get(child(dbRef, objectKey));
  } catch (error) {
    console.error(error);
  }
}

export async function setData(nodeName, id, object) {
  try {
    return await set(ref(database, `${nodeName}/${id}`), object);
  } catch (error) {
    console.error(error);
  }
}
