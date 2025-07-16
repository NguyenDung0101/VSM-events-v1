"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  eventDate: string; // ví dụ: "2025-12-28T00:00:00"
}

export function CountdownTimer({ eventDate }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(eventDate).getTime();
    const diff = target - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <p className="text-xl font-semibold text-red-500 mt-6">
        Sự kiện đã bắt đầu!
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6"
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-5 sm:px-6 sm:py-6 w-[80px] sm:w-[100px] text-center shadow-xl hover:scale-105 transition-transform"
        >
          <div className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-sm">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs uppercase text-gray-300 mt-2 tracking-wide">
            {label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
