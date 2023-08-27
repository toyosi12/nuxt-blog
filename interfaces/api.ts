import { Currency } from "enums/currencies";

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

export interface FlwPaymentOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: Currency;
  payment_type?: string;
  customer: {
    email: string;
    name: string;
    phone_number?: string;
  };
}

export interface Member {
  fullName: string;
  email: string;
}
