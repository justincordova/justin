import { useEffect, useState } from "react";
import { MapPin, Sun, Moon } from "lucide-react";

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
  return parseInt(hour, 10);
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
    <div className="h-fit overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-surface0">
      <div className="border-b border-ctp-surface1/50 px-4 py-3">
        <h2 className="font-sans text-sm font-semibold text-ctp-text">Currently Based In</h2>
      </div>
      <div className="flex flex-col items-center gap-3 p-5 text-center">
        <MapPin className="h-5 w-5 text-ctp-mauve" />
        <p className="text-sm font-medium text-ctp-text">
          Stewartsville, NJ
        </p>
        <div className="flex items-center gap-2 rounded-md bg-ctp-base px-3 py-1.5">
          {isDaytime ? (
            <Sun className="h-4 w-4 text-ctp-yellow" />
          ) : (
            <Moon className="h-4 w-4 text-ctp-blue" />
          )}
          <span className="font-mono text-xs text-ctp-subtext0">
            {time} ET
          </span>
        </div>
      </div>
    </div>
  );
}
