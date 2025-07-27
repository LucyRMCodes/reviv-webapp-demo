import styles from "../styles/loading.module.css";

function Loading({
  text,
  innerComponents,
}: {
  text?: string;
  innerComponents?: any;
}) {
  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.innerContainer}>
        {text && (
          <div>
            <h2>{text}</h2>
          </div>
        )}
        {innerComponents && innerComponents}
      </div>
    </div>
  );
}

export default Loading;
