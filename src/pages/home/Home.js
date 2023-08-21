import React from "react";

// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// Styles
import styles from "./Home.module.css";

// Components
import TransactionForm from "./TransactionForm";
import { TransactionList } from "./TransactionList";

function Home() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection("transactions", [
    "uid",
    "==",
    user.uid,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {isPending && <p className={styles.loading}> Loading...</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
