import { db } from "./config/firebase";

async function test() {
  const docRef = await db.collection("test").add({
    message: "MotoOS Firestore Connected",
    createdAt: new Date(),
  });

  console.log("Document created:", docRef.id);
}

test()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });