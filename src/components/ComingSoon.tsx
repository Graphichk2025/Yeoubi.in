import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import comingSoonBg from "@/assets/coming-soon.jpg";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={comingSoonBg}
          alt="Coming Soon"
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 container-wide px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-caption mb-4">COMING SOON</p>
          <h2 className="text-display mb-6">DROP 002</h2>
          <p className="text-subhead mb-12 max-w-xl mx-auto">
            Something bold is on the horizon. Be the first to know.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="glass-card text-center min-w-[80px] md:min-w-[100px]">
                <div className="text-3xl md:text-5xl font-display font-bold mb-1">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-caption">{label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Notify Form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 glass px-6 py-4 rounded-full text-foreground placeholder:text-muted-foreground 
                         focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <button className="glass-btn-primary whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
