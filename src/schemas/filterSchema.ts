import { z } from "zod";

export const filterSchema = z.object({
  brand: z.string().nullish().optional(),
  model: z.string().nullish().optional(),
  color: z.string().nullish().optional(),
  year: z.string().nullish().optional(),
  fuel: z.string().nullish().optional(),
  mileage: z.string().nullish().optional(),
  price: z.string().nullish().optional(),
});

export type FilterData = z.infer<typeof filterSchema>;
