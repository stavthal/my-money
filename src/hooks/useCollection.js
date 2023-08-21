import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/Config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    setPending(true);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
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
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};
