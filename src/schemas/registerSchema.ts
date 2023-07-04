import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("E-mail inválido"),
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
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      ),
    confirmPassword: z.string().nonempty("Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
