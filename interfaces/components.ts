import { Article } from "./api";

export interface CardProp {
  article: Article;
  isHero?: boolean;
}

export interface ButtonProp {
  btnText: string;
  btnType?: string;
}
