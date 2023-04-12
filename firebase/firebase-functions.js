import { ref, child, onValue, get, set } from "firebase/database";
import { database } from "./firebase-config";

export async function getDataOnce(nodeName) {
  const dbRef = ref(database);
  try {
    return (await get(child(dbRef, nodeName))).val();
  } catch (error) {
    console.error(error);
  }
}

export function getDataListen(nodeName, callback) {
  const dbRef = ref(database, nodeName);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

export async function setData(nodeName, id, object) {
  try {
    return await set(ref(database, `${nodeName}/${id}`), object);
  } catch (error) {
    console.error(error);
  }
}
