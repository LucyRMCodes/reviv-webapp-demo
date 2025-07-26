import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import PostEditor from "./pages/PostEditor";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:post_id/:title" element={<BlogPost />} />
        <Route path="/post-editor" element={<PostEditor />} />
        <Route path="/post-editor/:post_id" element={<PostEditor />} />
      </Routes>
    </>
  );
}

export default App;
