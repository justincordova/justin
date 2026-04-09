import { MapPin, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getEasternTime() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-edge bg-surface min-w-0">
      <div className="border-b border-edge/50 px-4 py-3">
        <h2 className="font-sans text-sm font-semibold text-content">Currently Based In</h2>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
        <MapPin className="h-5 w-5 text-primary" />
        <p className="text-sm font-medium text-content">Stewartsville, NJ</p>
        <div className="flex items-center gap-2 rounded-md bg-bg px-3 py-1.5">
          {isDaytime ? (
            <Sun className="h-4 w-4 text-secondary" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
          <span className="font-mono text-xs text-muted">{time} ET</span>
        </div>
      </div>
    </div>
  );
}
