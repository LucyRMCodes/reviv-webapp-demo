import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlogPost, fetchBlogPost } from "../Api";
import styles from "../styles/blogPost.module.css";
import { IoPersonCircle } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";
import Error from "../components/error";

function BlogPost() {
  const { post_id, author_id } = useParams();
  const [post, setPost] = useState({
    post_id: "",
    title: "",
    body: "",
    author: "",
    author_id: "",
  });
  const [error, setError] = useState<string>("");
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const { user } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (post_id && author_id) {
      fetchBlogPost(post_id)
        .then((data) => {
          setPost(data);
          if (author_id === user?.sub) {
            setIsAuthor(true);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [user]);

  const handleDelete = () => {
    deleteBlogPost(post_id).then(() => {
      console.log("deleted");
      navigate("/");
    });
  };

  if (error) return <Error errorMsg={error} />;

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
      <p className={styles.body}>{post.body}</p>
      {isAuthor && post_id && (
        <section className={styles.actions}>
          <Link
            to={`/post-editor/${post_id}`}
            className={`button ${styles.editButton}`}
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className={`button ${styles.deleteButton}`}
          >
            Delete
          </button>
        </section>
      )}
    </div>
  );
}

export default BlogPost;
