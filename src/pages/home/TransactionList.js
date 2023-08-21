import { useState } from "react";

// Styles
import styles from "./Home.module.css";

// Hooks
import { useFirestore } from "../../hooks/useFirestore";

export const TransactionList = ({ transactions }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { deleteDocument } = useFirestore("transactions");

  const handleDelete = (id) => {
    confirmation === true && deleteDocument(id);
    setSelectedId(id);
    setConfirmation(confirmation === true ? false : true);
  };
  return (
    <ul className={styles.transactions}>
      {transactions.map((item) => {
        return (
          <li key={item.id}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.amount}>{item.amount} €</p>
            {confirmation && selectedId === item.id && (
              <p className={styles.confirmation}>Are you sure?</p>
            )}
            <button onClick={() => handleDelete(item.id)}>x</button>
          </li>
        );
      })}
    </ul>
  );
};
