import styles from "../styles/blogCard.module.css";
import { IoPersonCircle } from "react-icons/io5";

function BlogCard({
  title,
  body,
  author,
  i,
}: {
  title: string;
  body: string;
  author: string;
  i: number;
}) {
  return (
    <div
      className={`${styles.blogCardContainer} ${i % 3 === 0 && styles.xlCard}`}
    >
      <h2>{title}</h2>
      <p className={styles.blurb}>{body}</p>
      <section className={styles.author}>
        <IoPersonCircle
          fontSize={"1.5rem"}
          // opacity={0.75}
          fill="#ee5626"
        />
        <h3>{author}</h3>
      </section>
    </div>
  );
}

export default BlogCard;
