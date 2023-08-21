import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/Config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING": {
      return { isPending: true, document: null, success: false, error: null };
    }

    case "ADDED_DOCUMENT": {
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    }

    case "DELETED_DOCUMENT": {
      return {
        ...state,
        isPending: false,
        success: true,
        error: null,
      };
    }

    case "ERROR": {
      return {
        ...state,
        isPending: false,
        success: false,
        document: null,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      console.log(err.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const deletedDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      console.log(err.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  //Cleanup function
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
