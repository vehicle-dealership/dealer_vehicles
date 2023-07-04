import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/userAuth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RLForm } from "../components/RLForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loading } from "../components/Loading";
import {
  ChangePasswordData,
  changePasswordSchema,
} from "../schemas/changePasswordSchema";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { iError } from "../services/requests";
import { useParams, useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const { setLogged, globalLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    setLogged(false);
  }, [setLogged]);

  const { token } = useParams();
  const navigate = useNavigate();

  const changePassword = async (data: ChangePasswordData) => {
    try {
      const formattedData = { password: data.password };
      await api.patch(`/users/resetPassword/${token}`, formattedData);
      navigate("/login");
      toast.success("Senha atualizada com sucesso!");
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
    }
  };

  return (
    <>
      {globalLoading && <Loading />}
      <Header />
      <RLForm onSubmit={handleSubmit(changePassword)}>
        <h1 className="text-heading-5-500 mb-8">Esqueci minha senha</h1>
        <Input
          label="Nova senha"
          placeholder="Digitar nova senha"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirmar nova senha"
          placeholder="Digitar nova senha"
          type={"password"}
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          btnColor="btn-brand-1"
          btnSize="btn-big"
          attributes="w-full">
          Atualizar senha
        </Button>
      </RLForm>
      <Footer />
    </>
  );
};
