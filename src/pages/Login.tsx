import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/userAuth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { RLForm } from "../components/RLForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../schemas/loginSchema";
import { Loading } from "../components/Loading";
import { ResetPassword } from "../components/Modals/ResetPassword";
import { Modal } from "../components/Modal";

export const Login = () => {
  const {
    setLogged,
    login,
    globalLoading,
    isResetPasswordModalOpen,
    toggleResetPasswordModal,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLogged(false);
  }, [setLogged]);

  return (
    <>
      {globalLoading && <Loading />}
      {isResetPasswordModalOpen && (
        <Modal
          title="Auxílio de senha"
          toggleModal={() => toggleResetPasswordModal()}
          attributes="max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto"
          widthFull>
          <ResetPassword />
        </Modal>
      )}
      <Header />
      <RLForm onSubmit={handleSubmit(login)}>
        <h1 className="text-heading-5-500 mb-8">Login</h1>
        <Input
          label="Email"
          placeholder="Digitar email"
          type="email"
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Senha"
          placeholder="Digitar senha"
          type={"password"}
          register={register("password")}
          error={errors.password?.message}
        />

        <div className="flex justify-end items-center mb-5">
          <button
            type="button"
            onClick={() => toggleResetPasswordModal()}
            className="border-none bg-transparent text-grey-2 text-body-2-500">
            Esqueci minha senha
          </button>
        </div>
        <Button
          type="submit"
          btnColor="btn-brand-1"
          btnSize="btn-big"
          attributes="w-full">
          Fazer login
        </Button>
        <div className="mt-6 flex justify-center items-center mb-6">
          <p className="text-grey-2 text-body-2-400 ">
            Ainda não tem cadastro?
          </p>
        </div>
        <Button
          type="button"
          handleClick={() => navigate("/register")}
          btnColor="btn-outline-2"
          btnSize="btn-big"
          attributes="w-full">
          Cadastrar
        </Button>
      </RLForm>
      <Footer />
    </>
  );
};
