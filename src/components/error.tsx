import styles from "../styles/error.module.css";

function Error({ errorMsg }: { errorMsg?: string }) {
  return (
    <div className={styles.error}>
      <h1>Uh oh</h1>
      <p>{errorMsg}</p>
      <p className={styles.tryAgain}>Please try again</p>
    </div>
  );
}

export default Error;
