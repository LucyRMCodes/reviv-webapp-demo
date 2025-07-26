import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:post_id/:title" element={<BlogPost />} />
      </Routes>
    </>
  );
}

export default App;
