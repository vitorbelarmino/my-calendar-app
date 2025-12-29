export type ThemeColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "teal";

export const eventColors = [
  { name: "Blue", value: "#3B82F6", theme: "blue" as ThemeColor },
  { name: "Red", value: "#EF4444", theme: "red" as ThemeColor },
  { name: "Green", value: "#22C55E", theme: "green" as ThemeColor },
  { name: "Yellow", value: "#EAB308", theme: "yellow" as ThemeColor },
  { name: "Purple", value: "#8B5CF6", theme: "purple" as ThemeColor },
  { name: "Pink", value: "#EC4899", theme: "pink" as ThemeColor },
  { name: "Orange", value: "#F97316", theme: "orange" as ThemeColor },
  { name: "Teal", value: "#14B8A6", theme: "teal" as ThemeColor },
];

export const getColorValue = (theme: ThemeColor): string => {
  return eventColors.find((c) => c.theme === theme)?.value || "#3B82F6";
};

export interface IEvent {
  id: string;
  title: string;
  description: string;
  themeColor: ThemeColor;
  date: string;
  hour: string;
  createdAt: string;
  updatedAt: string;
}

export type IEventDTO = Omit<IEvent, "id" | "createdAt" | "updatedAt">;
