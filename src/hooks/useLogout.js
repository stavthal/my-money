import { useState } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";
import { useEffect } from "react/cjs/react.production.min";

export const useLogout = () => {
  const [isCancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setPending(true);

    //sign the user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

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

  return { logout, isPending, error };
};
