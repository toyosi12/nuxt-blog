import { Article } from "./api";

export interface CardProp {
  article: Article;
  isHero?: boolean;
}

export interface ButtonProp {
  btnType?: string;
  onClick?: Function;
}

export interface ArticleDetailProp {
  author: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}
