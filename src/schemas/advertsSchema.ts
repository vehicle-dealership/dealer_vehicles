import { z } from "zod";
const advertSchema = z.object({
  id: z.number(),
  title: z.string().max(150),
  description: z.string().optional().nullish(),
  price: z.number().or(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  brand: z.string().max(40),
  model: z.string().max(40),
  year: z.number(),
  fuel: z.string().max(10),
  is_active: z.boolean().optional().default(true),
});

const advertSchemaMultiple = z.array(advertSchema);

type tAdvert = z.infer<typeof advertSchema>;
type tAdvertMultiple = z.infer<typeof advertSchemaMultiple>;
