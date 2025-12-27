import * as yup from "yup";
import { eventColors } from "../types/event";

export const eventSchema = yup
  .object({
    title: yup
      .string()
      .required("Título é obrigatório")
      .min(3, "Título deve ter pelo menos 3 caracteres")
      .max(100, "Título deve ter no máximo 100 caracteres"),
    description: yup
      .string()
      .required("Descrição é obrigatória")
      .min(3, "Descrição deve ter pelo menos 3 caracteres")
      .max(500, "Descrição deve ter no máximo 500 caracteres"),
    date: yup
      .string()
      .required("Data é obrigatória")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
    hour: yup
      .string()
      .required("Hora é obrigatória")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
    themeColor: yup
      .string()
      .oneOf(
        eventColors.map((c) => c.theme),
        "Cor inválida",
      )
      .required("Cor é obrigatória"),
  })
  .required();

export type EventFormData = yup.InferType<typeof eventSchema>;
