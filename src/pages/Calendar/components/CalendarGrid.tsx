import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { getColorValue } from "../../../types/event";
import type { IEvent } from "../../../types/event";
import { toDateStringISO, isToday, isSameMonth } from "../../../utils/date";

interface CalendarGridProps {
  currentDate: Date;
  currentMonth: string;
  currentYear: number;
  events: IEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: IEvent) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onNewEvent: () => void;
}

export const CalendarGrid = ({
  currentDate,
  currentMonth,
  currentYear,
  events,
  onDayClick,
  onEventClick,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onNewEvent,
}: CalendarGridProps) => {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    console.log(firstDay, lastDay);
    console.log("daysInMonth", daysInMonth, "startingDay", startingDay);

    const days: Date[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = toDateStringISO(date);
    return events.filter((event) => event.date === dateStr);
  };

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate);

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={onPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={onToday}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hoje
            </button>
          </div>

          <h2 className="text-xl w-full text-center sm:w-auto order-3 sm:order-2 sm:text-2xl font-semibold text-gray-900">
            {currentMonth} {currentYear}
          </h2>

          <button
            onClick={onNewEvent}
            className="px-4 flex py-2 order-2 sm:order-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Evento
          </button>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="grid grid-cols-7 grid-line mb-2">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-xs sm:text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-l border-t border-gray-200">
          {days.map((date) => {
            const dayEvents = getEventsForDate(date);
            const isTodayDate = isToday(date);
            const isCurrentMonthDate = isCurrentMonth(date);

            return (
              <div
                key={date.toISOString()}
                onClick={() => onDayClick(date)}
                className={`
                  aspect-square p-1 sm:p-2 cursor-pointer transition-colors
                  hover:bg-gray-50 border-r border-b border-gray-200
                  ${isTodayDate ? "bg-blue-50" : ""}
                `}
              >
                <div className="h-full flex flex-col">
                  <span
                    className={`
                      text-xs sm:text-sm font-medium
                      ${isTodayDate ? "text-blue-600" : !isCurrentMonthDate ? "text-gray-300" : "text-gray-900"}
                    `}
                  >
                    {date.getDate()}
                  </span>
                  <div className="flex-1 overflow-hidden mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className="text-[10px] sm:text-xs px-1 py-0.5 rounded truncate text-white cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: getColorValue(event.themeColor) }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[10px] text-gray-500 px-1">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
