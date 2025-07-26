import { useState } from "react";
import styles from "../styles/postEditor.module.css";
import { postBlogPost } from "../Api";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";

function PostEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anon, setAnon] = useState(false);
  const [posting, setPosting] = useState(false);
  const [published, setPublished] = useState(false);

  const { user } = useAuth0();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const author = anon ? "Anonymous" : user?.name;
      postBlogPost(author || "Anonymous", body, title).then((res) => {
        if (res.status === 201) {
          //   setPosting(false);
          setPublished(true);
        }
      });
    }
  };
  return (
    <>
      {posting && (
        <Loading
          text={published ? "Post published successfully" : "Publishing..."}
          innerComponents={published && <button>Home</button>}
        />
      )}
      <form className={styles.postEditorContainer} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className={styles.titleEditor}
          type="text"
          id="title"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          className={styles.bodyEditor}
          draggable={false}
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

          <button disabled={!title || !body}>Publish</button>
        </section>
      </form>
    </>
  );
}

export default PostEditor;
