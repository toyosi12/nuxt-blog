import { Currency } from "enums/currencies";
import { PaymentStatus } from "enums/payment-statuses";

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
  yoast_head_json: any;
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
  onclose?: (incomplete?: boolean) => void;
}

export interface FlwPaymentResponse {
  amount: string;
  currency: string;
  customer: {
    name: string;
    email: string;
    phhone_number: string;
  };
  flw_ref: string;
  status: PaymentStatus;
  tx_ref: string;
  transactionId: number;
}

export interface Member {
  fullName: string;
  email: string;
}
