import { Article } from "./api";

export interface CardProp {
  article: Article;
  isSkeleton: boolean;
  isHero?: boolean;
}

export interface ButtonProp {
  btnType?: string;
  onClick?: Function;
  type?: string;
  arialLabel?: string;
  disabled?: boolean;
}

export interface ArticleDetailProp {
  author: string;
  date: string;
  title: string;
  content: string;
  img: string;
  pageTitle: string;
  slug: string;
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

export interface Event {
  target: {
    value: any;
  };
  preventDefault: () => {};
}
