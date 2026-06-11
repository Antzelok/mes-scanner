import { z } from "zod";

export const errorFormSchema = z.object({
  date: z.string(),
  latitude: z.number().min(1, "Το πεδίο είναι υποχρεωτικό"),
  longitude: z.number().min(1, "Το πεδίο είναι υποχρεωτικό"),
  serialNumber: z.string().min(1, "Το πεδίο είναι υποχρεωτικό"),
  deveui: z.string().min(1, "Το πεδίο είναι υποχρεωτικό"),
  boxNumber: z.string().min(1, "Το πεδίο είναι υποχρεωτικό"),
  types: z.array(z.string()).optional(),
  actions: z.array(z.string()).optional(),
  comments: z.string().optional(),
});

export const userSignInSchema = z.object({
  email: z.string().min(1, "Το πεδίο είναι υποχρεωτικό"),
  password: z.string().min(1, "Το πεδίο είναι υποχρεωτικό"),
});
