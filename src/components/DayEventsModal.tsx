import { X, Plus, Clock, Edit2 } from "lucide-react";
import type { CalendarEvent } from "../types/event";
import { getColorValue } from "../types/event";
import { Button } from "./Button";

interface DayEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: CalendarEvent[];
  onEditEvent: (event: CalendarEvent) => void;
  onCreateEvent: () => void;
}

export const DayEventsModal = ({
  isOpen,
  onClose,
  date,
  events,
  onEditEvent,
  onCreateEvent,
}: DayEventsModalProps) => {
  if (!isOpen || !date) return null;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Eventos do dia</h2>
            <p className="text-sm text-gray-500 mt-1 capitalize">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhum evento neste dia</p>
              <Button onClick={onCreateEvent} variant="primary" icon={Plus}>
                Criar evento
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer group"
                  onClick={() => onEditEvent(event)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getColorValue(event.themeColor) }}
                        />
                        <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                      </div>
                      {event.hour && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.hour}</span>
                        </div>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      )}
                    </div>
                    <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-opacity">
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {events.length > 0 && (
          <div className="p-6 border-t">
            <button
              onClick={onCreateEvent}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Novo evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
