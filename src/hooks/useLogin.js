import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setPending(true);

    //sign the user in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        console.log(err.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { login, isPending, error };
};
