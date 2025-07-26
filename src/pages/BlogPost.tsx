import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPost } from "../Api";
import styles from "../styles/blogPost.module.css";
import { IoPersonCircle } from "react-icons/io5";

function BlogPost() {
  const { post_id, title } = useParams();
  const [post, setPost] = useState({ title: "", body: "", author: "" });
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (post_id) {
      fetchBlogPost(post_id)
        .then((data) => {
          setPost(data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, []);
  return (
    <div className={styles.blogPostContainer}>
      <h1>{post.title}</h1>
      <section className={styles.author}>
        <IoPersonCircle
          fontSize={"3rem"}
          // opacity={0.75}
          fill="#201f1f"
        />
        <h2>{post.author}</h2>
      </section>
      <section>
        {post.body.split("\n").map((segment) => {
          return <p className={styles.body}>{segment}</p>;
        })}
      </section>
    </div>
  );
}

export default BlogPost;
