"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({ endDateISO }) {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const end = new Date(endDateISO).getTime();
    const tick = () => {
      const now = Date.now();
      const left = end - now;
      if (left > 0) {
        const h = String(Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        const m = String(Math.floor((left % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        const s = String(Math.floor((left % (1000 * 60)) / 1000)).padStart(2, "0");
        setTime(`${h}:${m}:${s}`);
      } else {
        setTime("Offer Expired");
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDateISO]);
  return <span>{time}</span>;
}
