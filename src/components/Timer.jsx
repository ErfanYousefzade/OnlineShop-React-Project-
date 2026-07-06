import { useEffect, useState } from "react";

export default function Timer() {
  const targetDate = new Date("2026-09-29T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Box = ({ value, label }) => (
    <div
      className="
        bg-white/5
        border border-white/10
        backdrop-blur-md
        rounded-xl
        px-4 py-2
        min-w-[75px]
        text-center
        transition-all duration-300
        hover:border-indigo-400
        hover:-translate-y-1
      "
    >
      {/* عدد با انیمیشن نرم */}
      <h2
        key={value}
        className="
          text-2xl md:text-3xl
          font-bold
          text-white
          transition-all
          duration-300
          animate-[pulse_1s_ease-in-out]
        "
      >
        {value}
      </h2>

      <p className="text-xs text-slate-300 mt-1">{label}</p>
    </div>
  );

  return (
    <div
      className="
        bg-gradient-to-r
        from-slate-900
        via-slate-800
        to-slate-900
        rounded-2xl
        px-6 py-4
        shadow-xl
        border border-slate-700
        text-center
      "
    >
      <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
        🔥 Special Offer
      </h2>

      <p className="text-slate-400 text-sm mb-4">
        Limited time discount ends soon
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Box value={timeLeft.days} label="Days" />
        <Box value={timeLeft.hours} label="Hours" />
        <Box value={timeLeft.minutes} label="Min" />
        <Box value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}