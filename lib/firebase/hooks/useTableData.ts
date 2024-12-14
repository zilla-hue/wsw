import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, QueryConstraint, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { logger } from '../utils/logger';

export const useTableData = <T>({ collectionName }: { collectionName: string }) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const fetchedData: T[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(fetchedData);
      } catch (err: any) {
        console.error('Error fetching Firestore data:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, isLoading, error };
};