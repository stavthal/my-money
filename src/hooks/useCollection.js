import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/Config";

export const useCollection = (collection, query) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    setPending(true);

    if (query) {
      ref = ref.where(...query);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);

        setPending(false);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data. Error: ", error.message);
        setPending(false);
      }
    );

    // unsubscribe on amount
    return () => unsubscribe();
  }, [collection]);

  return { documents, error, isPending };
};
