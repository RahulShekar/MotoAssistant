import { db } from "../config/firebase";

export async function createRider(rider: any) {
  const docRef = await db.collection("riders").add({
    ...rider,
    createdAt: new Date(),
  });

  return {
    id: docRef.id,
    ...rider,
  };
}

export async function getRiders() {
  const snapshot = await db.collection("riders").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}