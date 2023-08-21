import React, { useState } from "react";

import { useLogin } from "../../hooks/useLogin";

//styles
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`email: ${email} & password: ${password}`);
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </label>

      <label>
        <span>password:</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
