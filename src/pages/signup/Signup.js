import React, { useState } from "react";

import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== "") {
      if (password === confirmPassword) {
        alert("Success!");
      } else {
        setPasswordErrorText("Passwords must match.");
        setPasswordError(true);
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      setPasswordErrorText("Password is empty.");
      setPasswordError(true);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
        <h2>Sign up</h2>
        <span
          className={`${styles.error} ${
            passwordError ? styles["error-visible"] : styles["error-hidden"]
          }`}
        >
          {passwordErrorText}
        </span>
        <label>
          <span>Email:</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
        </label>

        <label>
          <span>Display Name:</span>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            type="text"
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            onFocus={() => passwordError && setPasswordError(false)}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </label>

        <label>
          <span>Confirm Password:</span>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
        </label>
        <button className="btn">Sign up</button>
      </form>
    </div>
  );
}
