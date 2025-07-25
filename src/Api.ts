import axios from "axios";

const blogApi = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const fetchBlogPosts = () => {
  return blogApi.get("/posts").then(({ data }) => {
    return data;
  });
};

export const postBlogPost = (author: string, title: string, body: string) => {
  return blogApi.post("/post", { author, title, body });
};
