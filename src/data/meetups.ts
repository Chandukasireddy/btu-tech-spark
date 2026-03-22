export interface Meetup {
  id: number;
  date: Date;
  markdownFile: string;
}

// #19 = March 22, 2025. Each prior meetup is one Sunday back.
const BASE_DATE = new Date("2025-03-22T14:00:00");

function sundaysBack(n: number): Date {
  const d = new Date(BASE_DATE);
  d.setDate(d.getDate() - n * 7);
  return d;
}

export const meetups: Meetup[] = Array.from({ length: 19 }, (_, i) => {
  const num = 19 - i; // 19 down to 1
  return {
    id: num,
    date: sundaysBack(19 - num),
    markdownFile: `/meetups/meetup-${String(num).padStart(2, "0")}.md`,
  };
});

export const upcomingMeetup = meetups[0]; // #19
export const previousMeetups = meetups.slice(1);  // #18 down to #1

export function formatMeetupDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMeetupMonth(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "short" });
}

export function formatMeetupDay(date: Date): string {
  return String(date.getDate());
}
