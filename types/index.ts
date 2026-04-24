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
  comments: string | null;
};

export type UserSignInForm = {
  email: string;
  password: string;
};

export const typeOptions: string[] = [
  "Boot Loop",
  "Motor Error",
  "Low Battery",
  "Διαρροή",
  "Πόρτα",
  "'Άλλο",
];

export const actionOptions: string[] = [
  "Flash Firmware",
  "Callibrate Valve",
  "Αλλαγή Μπαταρίας",
  "Επισκευή Διαρροής",
  "Κλείσιμο Πόρτας",
  "Άλλο",
];

export type ErrorFormType = z.infer<typeof errorFormSchema>;
export type UserSignInFormType = z.infer<typeof userSignInSchema>;
