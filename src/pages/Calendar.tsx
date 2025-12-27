import { useState, useEffect } from "react";
import { CalendarGrid } from "../components/CalendarGrid";
import { CalendarHeader } from "../components/CalendarHeader";
import { EventModal } from "../components/EventModal";
import { DayEventsModal } from "../components/DayEventsModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import type { CalendarEvent } from "../types/event";
import { eventsApi } from "../services/api";
import { showApiError } from "../utils/apiError";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayEventsModal, setShowDayEventsModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await eventsApi.getAll();
        setEvents(data);
      } catch (err) {
        showApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    const dateStr = date.toISOString().split("T")[0];
    const dayEvents = events.filter((event) => event.date === dateStr);

    setSelectedDate(date);

    if (dayEvents.length === 0) {
      setSelectedEvent(null);
      setShowEventModal(true);
    } else {
      setShowDayEventsModal(true);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowDayEventsModal(false);
    setShowEventModal(true);
  };

  const handleNewEvent = () => {
    setSelectedDate(new Date());
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleCreateEventFromDay = () => {
    setShowDayEventsModal(false);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSaveEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      if (eventData.id) {
        const { data } = await eventsApi.update(eventData.id, {
          title: eventData.title!,
          description: eventData.description!,
          date: eventData.date!,
          hour: eventData.hour!,
          themeColor: eventData.themeColor!,
        });
        setEvents((prev) =>
          prev
            .map((e) => (e.id === data.id ? data : e))
            .sort((a, b) => {
              const dateCompare = a.date.localeCompare(b.date);
              if (dateCompare !== 0) return dateCompare;
              return a.hour.localeCompare(b.hour);
            }),
        );
      } else {
        const { data } = await eventsApi.create({
          title: eventData.title!,
          description: eventData.description!,
          date: eventData.date!,
          hour: eventData.hour!,
          themeColor: eventData.themeColor!,
        });
        setEvents((prev) =>
          [...prev, data].sort((a, b) => {
            const dateCompare = a.date.localeCompare(b.date);
            if (dateCompare !== 0) return dateCompare;
            return a.hour.localeCompare(b.hour);
          }),
        );
      }
      setShowEventModal(false);
      setSelectedEvent(null);
    } catch (err) {
      showApiError(err);
    }
  };

  const handleDeleteClick = () => {
    if (selectedEvent?.id) {
      setEventToDelete(selectedEvent.id);
      setShowConfirmDelete(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await eventsApi.delete(eventToDelete);
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete));
      setShowConfirmDelete(false);
      setShowEventModal(false);
      setEventToDelete(null);
      setSelectedEvent(null);
    } catch (err) {
      showApiError(err);
    }
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleCloseDayEventsModal = () => {
    setShowDayEventsModal(false);
    setSelectedDate(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <CalendarHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Carregando eventos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CalendarHeader />

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

      <EventModal
        isOpen={showEventModal}
        onClose={handleCloseEventModal}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? handleDeleteClick : undefined}
        event={selectedEvent}
        selectedDate={selectedDate}
      />

      <DayEventsModal
        isOpen={showDayEventsModal}
        onClose={handleCloseDayEventsModal}
        date={selectedDate}
        events={
          selectedDate
            ? events.filter((e) => e.date === selectedDate.toISOString().split("T")[0])
            : []
        }
        onEditEvent={handleEventClick}
        onCreateEvent={handleCreateEventFromDay}
      />

      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir evento"
        message="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
}
