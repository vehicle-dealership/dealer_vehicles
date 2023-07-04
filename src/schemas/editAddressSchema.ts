import { z } from "zod";

export const editAddressSchema = z.object({
  zipCode: z
    .string()
    .nonempty("O CEP é obrigatório")
    .min(8, "O CEP deve conter no mínimo 8 digitos")
    .max(9, "O CEP deve conter no máximo 9 digitos"),
  state: z
    .string()
    .nonempty("O Estado é obrigatório")
    .length(2, "O Estado deve conter somente 2 caracteres"),
  city: z.string().nonempty("A cidade é obrigatória"),
  street: z.string().nonempty("A rua é obrigatória"),
  number: z.string().nullish().optional(),
  complement: z.string().nullish().optional(),
});

export type EditAddressData = z.infer<typeof editAddressSchema>;
