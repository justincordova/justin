import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getEasternTime() {
  return new Date()
    .toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
}

function getEasternHour(): number {
  const hour = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    hour12: false,
  });
  const parsed = parseInt(hour, 10);
  return Number.isNaN(parsed) ? 12 : parsed;
}

export default function LocationWidget() {
  const [time, setTime] = useState(getEasternTime);
  const [isDaytime, setIsDaytime] = useState(() => {
    const h = getEasternHour();
    return h >= 6 && h < 18;
  });

  useEffect(() => {
    const update = () => {
      setTime(getEasternTime());
      const h = getEasternHour();
      setIsDaytime(h >= 6 && h < 18);
    };

    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="flex items-center justify-center gap-2 text-xs text-muted">
      <span>based in stewartsville, nj</span>
      <span className="text-faint">·</span>
      {isDaytime ? (
        <Sun className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
      )}
      <span style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}>{time} et</span>
    </p>
  );
}
