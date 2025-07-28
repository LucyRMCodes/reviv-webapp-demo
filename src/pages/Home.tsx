import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../Api";
import BlogCard from "../components/blogCard";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import Error from "../components/error";
import Spinner from "../components/spinner";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBlogPosts({})
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const linkStyle = {
    color: "inherit",
    textDecoration: "inherit",
  };

  if (loading) return <Loading text="Loading" innerComponents={<Spinner />} />;
  if (error) return <Error errorMsg={error} />;

  return (
    <div className="main" style={{ marginTop: "10vh" }}>
      <div className="hero">
        <img
          src="hero.jpg"
          aria-label="Image by İlhan Erce Feyizoğlu from Pixabay"
          alt="Image by İlhan Erce Feyizoğlu from Pixabay"
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
            {posts.map(({ title, body, author, author_id, post_id }) => {
              return (
                <div key={post_id}>
                  <Link
                    to={`/posts/${author_id}/${post_id}/${title}`}
                    style={linkStyle}
                  >
                    <BlogCard
                      title={title}
                      body={body}
                      author={author}
                      i={post_id}
                    />
                  </Link>
                </div>
              );
            })}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
