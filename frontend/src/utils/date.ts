// Local date parts only — never toISOString(), which is UTC-based and can
// report the wrong calendar day near midnight.
export function toLocalDateISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

// Sunday of the week containing d.
export function startOfWeek(d: Date): Date {
  const start = new Date(d);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
}

// Handles both "23:59:00" (from the API) and "23:59" (from a time input).
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":");
  return Number(h) * 60 + Number(m);
}

// Minutes from midnight (or a duration in minutes) as a percentage of a day.
// Works for both because a day is 1440 minutes either way.
export function minutesToPercent(minutes: number): number {
  return (minutes / 1440) * 100;
}

// Local wall-clock minutes from midnight for an instant.
export function localMinutesOfDay(d: Date): number {
  return d.getHours() * 60 + d.getMinutes();
}

export const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const timeIntervals: number[] = [0, 15, 30, 45];

//returns number and * 5/72 is the same as 100/1440 (100 being percent and 1440 being minutes in a day)
export const calculate_percent = (time: string) => {
  const timeWithoutSeconds = time.slice(0, time.length - 3);
  const [hours, minutes] = timeWithoutSeconds.split(":").map(Number);
  return ((hours * 60 + minutes) / 72) * 5;
};

export const endOfToday = () => {
  const d = new Date();
  d.setHours(23, 59, 0, 0);
  return d;
};

export function toLocalDateTimeInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
       + `T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Next 15-minute mark, so a default start lands on a gridline.
export function nextQuarterHour(): Date {
  const d = new Date();
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  return d;
}