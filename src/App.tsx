import { useEffect, useState } from "react";
import "./App.css";
import { fetchBlogPosts } from "./Api";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);
  return (
    <>
      {posts &&
        posts.map(({ title, body, author }, i) => {
          return (
            <div key={i}>
              <p>{title}</p>
              <p>{body}</p>
              <p>{author}</p>
            </div>
          );
        })}
      {error && <p>error</p>}
    </>
  );
}

export default App;
