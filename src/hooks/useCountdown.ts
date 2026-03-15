import { useState, useEffect } from "react";

function getNextSunday14(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const daysUntilSunday = (7 - day) % 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilSunday);
  next.setHours(14, 0, 0, 0);
  // If it's Sunday but past 14:00, go to next Sunday
  if (daysUntilSunday === 0 && now > next) {
    next.setDate(next.getDate() + 7);
  }
  return next;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const target = getNextSunday14();
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setValues({ days, hours, minutes, seconds });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return values;
}
