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
      {text && (
        <div>
          <h2>{text}</h2>
        </div>
      )}
      {innerComponents && innerComponents}
    </div>
  );
}

export default Loading;
