import React from "react";

import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>

        <li>
          <btn className="btn" onClick={logout}>
            Logout
          </btn>
        </li>
      </ul>
    </nav>
  );
}
