export interface Article {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  yoast_head: string;
  yoast_head_json: {
    author: string;
    og_image: {
      url: string;
    }[];
  };
  primary_category: {
    name: string;
  };
}
