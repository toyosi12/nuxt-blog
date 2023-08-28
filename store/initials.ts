import { Article } from "interfaces/api";

export const initialArticle: Article = {
  id: 1,
  date: "",
  modified: "",
  slug: "",
  status: "",
  title: {
    rendered: "",
  },
  content: {
    rendered: "",
  },
  excerpt: {
    rendered: "",
  },
  yoast_head: "yoast head",
  yoast_head_json: {
    author: "",
    og_image: [
      {
        url: "",
      },
    ],
  },
  primary_category: {
    name: "",
  },
};
