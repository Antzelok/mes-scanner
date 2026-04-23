import { z } from "zod";
import { errorFormSchema, userSignInSchema } from "@/lib/validators";

export type ErrorForm = {
  id: string;
  date: string;
  latitude: number;
  longitude: number;
  serialNumber: string;
  deveui: string;
  boxNumber: string;
  types: string[];
  actions: string[];
  comment?: string | null;
};

export type UserSignInForm = {
  email: string;
  password: string;
};

export type ErrorFormType = z.infer<typeof errorFormSchema>;
export type UserSignInFormType = z.infer<typeof userSignInSchema>;
