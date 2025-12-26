import { toast } from "react-toastify";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      errors?: string[];
    };
  };
  code?: string;
}

export function getApiErrorMessage(error: unknown): string {
  const apiError = error as ApiError;

  if (!apiError.response) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão.";
  }

  if (apiError.response.status === 401) {
    return apiError.response.data?.message || "Credenciais inválidas.";
  }

  if (apiError.response.status && apiError.response.status >= 500) {
    return "Erro no servidor. Tente novamente mais tarde.";
  }

  return (
    apiError.response.data?.errors?.[0] || apiError.response.data?.message || "Ocorreu um erro inesperado."
  );
}

export function showApiError(error: unknown): void {
  const message = getApiErrorMessage(error);
  toast.error(message);
}
