import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string().nonempty("O email é obrigatório").email("E-mail inválido"),
  cpf: z
    .string()
    .nonempty("O CPF é obrigatório")
    .min(11, "O CPF deve conter no mínimo 11 digitos")
    .max(14, "O CPF deve conter no máximo 14 digitos"),
  phone: z.string().nonempty("O telefone é obrigatório"),
  day: z
    .string()
    .nonempty("O dia é obrigatório")
    .length(2, "O dia deve ter 2 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  month: z
    .string()
    .nonempty("O mês é obrigatório")
    .length(2, "O mês deve ter 2 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  year: z
    .string()
    .nonempty("O ano é obrigatório")
    .length(4, "O ano deve ter 4 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  description: z.string().optional(),
});

export type EditProfileData = z.infer<typeof editProfileSchema>;
