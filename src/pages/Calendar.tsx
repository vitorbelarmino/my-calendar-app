import { useState } from "react";
import { CalendarGrid } from "../components/CalendarGrid";
import { CalendarHeader } from "../components/CalendarHeader";
import type { CalendarEvent } from "../types/event";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(`${event.date}T00:00:00`));
  };

  const handleNewEvent = () => {
    console.log("Novo evento");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CalendarHeader title="Meu Calendário" />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-7xl bg-white rounded-xl border border-gray-200 shadow-sm">
          <CalendarGrid
            currentDate={currentDate}
            currentMonth={monthNames[currentDate.getMonth()]}
            currentYear={currentDate.getFullYear()}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            onNewEvent={handleNewEvent}
          />
        </div>
      </main>
    </div>
  );
}
