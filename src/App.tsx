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
    <div className="main" style={{ marginTop: "10vh" }}>
      <div className="hero">
        <img
          src="hero.jpg"
          aria-label="Image by İlhan Erce Feyizoğlu from Pixabay"
        />
        <h1
          style={{
            color: "#ee5626",
            fontSize: "3rem",
            textDecoration: "underline",
            fontFamily: "poppins bold",
          }}
        >
          What's New?
        </h1>
      </div>
      {posts && (
        <section>
          <section className="blogPostsContainer">
            {posts.map(({ title, body, author }, i) => {
              return (
                <div key={i}>
                  <BlogCard title={title} body={body} author={author} i={i} />
                </div>
              );
            })}
          </section>
        </section>
      )}
      {error && <p>error</p>}
    </div>
  );
}

export default App;
