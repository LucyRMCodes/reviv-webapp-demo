import axios from "axios";

const blogApi = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const fetchBlogPosts = ({
  limit,
  offset,
}: {
  limit?: string;
  offset?: string;
}) => {
  let url = `/posts`;
  if (limit && offset) {
    url += `?limit=${limit}&offset=${offset}`;
  }
  return blogApi.get(url).then(({ data }) => {
    return data;
  });
};

export const fetchBlogPost = (post_id: string) => {
  return blogApi.get(`/posts/${post_id}`).then(({ data }) => {
    return data;
  });
};

export const postBlogPost = (
  author: string,
  author_id: string,
  body: string,
  title: string
) => {
  return blogApi.post("/post", { author, author_id, body, title });
};

export const patchBlogPost = (
  post_id: string,
  author: string,
  body: string,
  title: string
) => {
  return blogApi.patch(`/post/${post_id}`, { author, body, title });
};
