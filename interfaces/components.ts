import { Article } from "./api";

export interface CardProp {
  article: Article;
  isHero?: boolean;
}

export interface ButtonProp {
  btnType?: string;
  onClick?: Function;
  type?: string;
}

export interface ArticleDetailProp {
  author: string;
  date: string;
  title: string;
  content: string;
}

export interface InputProp {
  id: string;
  inputLabel: string;
  modelValue: string;
  type: string;
}

export interface DialogProp {
  isDialogOpen: boolean;
  onClose: Function;
}
