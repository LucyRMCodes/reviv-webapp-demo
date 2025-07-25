import { useEffect, useState } from "react";
import "./App.css";
import { fetchBlogPosts } from "./Api";
import BlogCard from "./components/blogCard";

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
      {posts && (
        <section className="blogPostsContainer">
          {posts.map(({ title, body, author }, i) => {
            return (
              <div key={i}>
                <BlogCard title={title} body={body} author={author} i={i} />
              </div>
            );
          })}
        </section>
      )}
      {error && <p>error</p>}
    </>
  );
}

export default App;
