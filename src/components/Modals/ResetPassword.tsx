import { Button } from "../Button";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/userAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendEmailData, sendEmailSchema } from "../../schemas/sendEmailSchema";

export const ResetPassword = () => {
  const { toggleResetPasswordModal, sendEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailData>({
    resolver: zodResolver(sendEmailSchema),
  });

  return (
    <form onSubmit={handleSubmit(sendEmail)}>
      <h3 className="text-body-2-500 mb-6">Insira o endereço de e-mail associado à sua conta.</h3>

      <Input
        label="Email"
        type="email"
        register={register("email")}
        placeholder="exemplo@email.com"
        error={errors.email?.message}
      />
      <div className="flex justify-end gap-3 mt-3">
        <Button
          type="button"
          btnSize="btn-big"
          btnColor="btn-negative"
          handleClick={() => toggleResetPasswordModal()}
          attributes="px-[5%] w-[48%]"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          btnSize="btn-big"
          btnColor={"btn-brand-1"}
          attributes="px-[5%] w-[48%]"
        >
          Enviar email
        </Button>
      </div>
    </form>
  );
};
