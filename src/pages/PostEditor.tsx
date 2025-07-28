import { useEffect, useState } from "react";
import styles from "../styles/postEditor.module.css";
import { fetchBlogPost, patchBlogPost, postBlogPost } from "../Api";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import { Link, useParams } from "react-router-dom";

function PostEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anon, setAnon] = useState(false);
  const [posting, setPosting] = useState(false);
  const [published, setPublished] = useState(false);

  const { user } = useAuth0();
  const { post_id } = useParams();

  useEffect(() => {
    if (post_id) {
      fetchBlogPost(post_id).then(({ body, title }) => {
        setTitle(title);
        setBody(body);
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const author = anon ? "Anonymous" : user?.name;
      if (post_id) {
        patchBlogPost(post_id, author || "Anonymous", body, title).then(
          (res) => {
            if (res.status === 200) {
              //   setPosting(false);
              setPublished(true);
            }
          }
        );
      } else {
        postBlogPost(author || "Anonymous", user.sub, body, title).then(
          (res) => {
            if (res.status === 201) {
              //   setPosting(false);
              setPublished(true);
            }
          }
        );
      }
    }
  };
  return (
    <>
      <form className={styles.postEditorContainer} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className={styles.titleEditor}
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          className={styles.bodyEditor}
          draggable={false}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <section className={styles.endContainer}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              value={0}
              onChange={() => {
                setAnon(!anon);
              }}
            />
            <label htmlFor="anonymous">Post anonymously</label>
          </div>

          <button className="button" disabled={!title || !body}>
            {post_id ? "Update" : "Publish"}
          </button>
        </section>
      </form>
      {posting && (
        <Loading
          text={published ? "Post published successfully" : "Publishing..."}
          innerComponents={
            published && (
              <Link
                to={post_id ? `/posts/${user.sub}/${post_id}/${title}` : "/"}
                className="button"
              >
                {post_id ? "View post" : "Home"}
              </Link>
            )
          }
        />
      )}
    </>
  );
}

export default PostEditor;
