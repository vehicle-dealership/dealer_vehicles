import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("O email é obrigatório").email("E-mail inválido"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type LoginData = z.infer<typeof loginSchema>;
