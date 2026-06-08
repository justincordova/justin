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
  // Some ICU builds format midnight as "24" with hour12:false; normalize so
  // 24 maps to 0 (otherwise midnight would be misclassified as night-edge).
  return Number.isNaN(parsed) ? 12 : parsed % 24;
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

  const Icon = isDaytime ? Sun : Moon;

  // Single responsive node — the "based in " prefix and the rest of the city
  // name only appear on md+ viewports. Avoids rendering two parallel widgets
  // (and two parallel intervals worth of accessible duplication).
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-muted md:gap-2 md:text-xs">
      <span>
        <span className="hidden md:inline">based in </span>
        stewartsville
        <span className="hidden md:inline">, nj</span>
      </span>
      <span className="text-faint">·</span>
      <Icon className="h-3 w-3 text-muted md:h-3.5 md:w-3.5" aria-hidden="true" />
      <span className="font-mono">{time} et</span>
    </div>
  );
}
