import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trash2 } from "lucide-react";
import type { CalendarEvent } from "../../../types/event";
import { eventColors } from "../../../types/event";
import TextField from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { eventSchema, type EventFormData } from "../../../schemas/eventSchema";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: () => void;
  event?: CalendarEvent | null;
  selectedDate?: Date | null;
}

export const EventModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDate,
}: EventModalProps) => {
  const getInitialDate = () => {
    if (event) return event.date;
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: getInitialDate(),
      hour: "",
      themeColor: "blue",
    },
  });

  const themeColor = watch("themeColor");

  useEffect(() => {
    if (isOpen) {
      if (event) {
        reset({
          title: event.title,
          description: event.description,
          date: event.date,
          hour: event.hour,
          themeColor: event.themeColor,
        });
      } else {
        reset({
          title: "",
          description: "",
          date: getInitialDate(),
          hour: "",
          themeColor: "blue",
        });
      }
    }
  }, [isOpen, event, selectedDate, reset]);

  const onSubmit = async (data: EventFormData) => {
    await onSave({ id: event?.id, ...data });
  };

  const handleDeleteClick = async () => {
    if (!onDelete) return;
    await onDelete();
  };

  const formatDateDisplay = (dateStr: string) => {
    const dateObj = new Date(dateStr + "T00:00:00");
    return dateObj.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 pl-2 " onClick={handleBackdropClick}>
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-6 shadow-lg sm:rounded-lg rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
            {event ? "Editar evento" : "Novo evento"}
          </h2>
          {selectedDate && (
            <p className="text-sm text-gray-500 capitalize">
              {formatDateDisplay(watch("date") || "")}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            id="title"
            type="text"
            label="Título"
            placeholder="Nome do evento"
            register={register("title")}
            error={errors.title?.message}
            disabled={isSubmitting}
          />

          <TextField
            id="description"
            label="Descrição"
            placeholder="Detalhes do evento"
            register={register("description")}
            error={errors.description?.message}
            disabled={isSubmitting}
            multiline
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="date"
              type="date"
              label="Data"
              register={register("date")}
              error={errors.date?.message}
              disabled={isSubmitting}
            />
            <TextField
              id="time"
              type="time"
              label="Hora"
              register={register("hour")}
              error={errors.hour?.message}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-sm font-medium text-gray-900">Cor</label>
            <div className="flex flex-wrap gap-2 pl-0.5">
              {eventColors.map((c) => {
                const isSelected = themeColor === c.theme;
                const buttonClasses = isSelected
                  ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                  : "hover:scale-105";
                return (
                  <button
                    key={c.theme}
                    type="button"
                    onClick={() => setValue("themeColor", c.theme)}
                    className={`w-8 h-8 rounded-full transition-all ${buttonClasses}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    disabled={isSubmitting}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            {event && onDelete && (
              <Button
                type="button"
                onClick={handleDeleteClick}
                disabled={isSubmitting}
                variant="danger"
                icon={Trash2}
                className="mr-0 sm:mr-auto"
              >
                Excluir
              </Button>
            )}
            <Button type="button" onClick={onClose} disabled={isSubmitting} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? "Salvando..." : event ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
