import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem ser iguais")
      .required("Confirmação de senha é obrigatória"),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;
