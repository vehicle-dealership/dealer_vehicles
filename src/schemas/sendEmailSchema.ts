import { z } from "zod";

export const sendEmailSchema = z.object({
  email: z.string().nonempty("O email é obrigatório").email("E-mail inválido"),
});

export type SendEmailData = z.infer<typeof sendEmailSchema>;
