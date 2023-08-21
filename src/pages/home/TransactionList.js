import styles from "./Home.module.css";

export const TransactionList = ({ transactions }) => {
  return (
    <ul className={styles.transactions}>
      {transactions.map((item) => {
        return (
          <li key={item.id}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.amount}>$ {item.amount}</p>
          </li>
        );
      })}
    </ul>
  );
};
