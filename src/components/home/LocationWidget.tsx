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

  const Icon = isDaytime ? Sun : Moon;
  const monoFont = "'Geist Mono', ui-monospace, monospace";

  return (
    <>
      {/* Desktop: full form */}
      <div className="hidden items-center gap-2 text-xs text-muted md:flex">
        <span>based in stewartsville, nj</span>
        <span className="text-faint">·</span>
        <Icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        <span style={{ fontFamily: monoFont }}>{time} et</span>
      </div>
      {/* Mobile: compact form */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted md:hidden">
        <span>stewartsville</span>
        <span className="text-faint">·</span>
        <Icon className="h-3 w-3 text-muted" aria-hidden="true" />
        <span style={{ fontFamily: monoFont }}>{time} et</span>
      </div>
    </>
  );
}
