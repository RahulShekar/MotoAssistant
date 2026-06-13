import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../credentials/firebase-adminsdk.json";

initializeApp({
  credential: cert(serviceAccount as any),
});

export const db = getFirestore();