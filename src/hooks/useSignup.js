import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setCancelled] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete sign up...");
      }

      //add display name to user
      await res.user.updateProfile({
        displayName,
      });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state
      if (!isCancelled) {
        setPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { error, isPending, signup };
};
