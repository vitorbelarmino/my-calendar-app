export function toDateStringISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function isSameMonth(date: Date, ref: Date): boolean {
  return date.getMonth() === ref.getMonth() && date.getFullYear() === ref.getFullYear();
}
export function formatDateLongPtBr(date: string | Date): string {
  let dateObj: Date;
  if (typeof date === "string") {
    if (!date || date.trim() === "") return "";
    dateObj = new Date(date + (date.length === 10 ? "T00:00:00" : ""));
  } else {
    dateObj = date;
  }
  if (isNaN(dateObj.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}
