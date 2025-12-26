import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import InputWithIcon from "../components/InputWithIcon";
import { useAuth } from "../hooks/useAuth";
import { showApiError } from "../utils/apiError";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (err) {
      showApiError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-6 space-y-1 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-gray-900">Entrar</h2>
            <p className="text-center text-sm text-gray-600">Entre com seu email e senha</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputWithIcon
                id="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                icon={Mail}
                register={register("email")}
                error={errors.email?.message}
                disabled={isSubmitting}
              />

              <InputWithIcon
                id="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                icon={Lock}
                register={register("password")}
                error={errors.password?.message}
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/register" className="text-sm text-blue-600 hover:underline">
                Não tem conta? Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
