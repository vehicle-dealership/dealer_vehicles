import { z } from "zod";

export const newAdvertSchema = z.object({
  brand: z.string().nonempty("O nome é obrigatório"),
  model: z
    .string()
    .nonempty("O modelo é obrigatório")
    .max(40, "Deve possuir 40 caracteres no máximo"),
  year: z.string().optional(),
  fuel: z.string().optional(),
  mileage: z
    .string()
    .max(10, "Deve possuir 10 caracteres no máximo")
    .nonempty("A quilometragem é obrigatória"),
  color: z
    .string()
    .nonempty("A cor é obrigatória")
    .max(20, "Deve possuir 20 caracteres no máximo"),
  fipe_price: z.number().or(z.string()).optional(),
  price: z.string().nonempty("O preço é obrigatório"),
  description: z.string().nonempty("A descrição é obrigatória"),
  cover_image: z.string().nonempty("A imagem de capa é obrigatória"),
  images: z.array(
    z.object({
      image_link_: z.string().nullish(),
    })
  ),
});

export type NewAdvertData = z.infer<typeof newAdvertSchema>;
