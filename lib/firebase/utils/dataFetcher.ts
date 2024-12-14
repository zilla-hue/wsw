import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; // Adjust based on your setup

export const DataFetcher = {
  fetchAllDocuments: async (collectionName: string, { onProgress }: { onProgress?: (count: number) => void }) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => doc.data());
    
    // Optionally report progress if needed
    if (onProgress) {
      onProgress(querySnapshot.size); // Notify progress with the number of documents fetched
    }

    return data;
  }
};