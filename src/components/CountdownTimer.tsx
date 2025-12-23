import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
    targetDate: string | Date | null;
    label?: string;
}

const CountdownTimer = ({ targetDate, label = "Next Drop In" }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        if (!targetDate) return;

        const calculateTimeLeft = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                return null;
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
        <div className="flex flex-col items-center">
            <div className="relative overflow-hidden h-8 md:h-10 flex items-center justify-center min-w-[3ch]">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-2xl md:text-3xl font-display font-bold tabular-nums"
                    >
                        {value.toString().padStart(2, "0")}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-tighter text-muted-foreground font-medium">
                {unit}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-2 py-4">
            {label && <span className="text-caption text-xs md:text-sm font-semibold text-red-accent/90">{label}</span>}
            <div className="flex gap-4 md:gap-8 items-center">
                <TimeUnit value={timeLeft.days} unit="Days" />
                <div className="h-4 w-px bg-border/50" />
                <TimeUnit value={timeLeft.hours} unit="Hours" />
                <div className="h-4 w-px bg-border/50" />
                <TimeUnit value={timeLeft.minutes} unit="Min" />
                <div className="h-4 w-px bg-border/50" />
                <TimeUnit value={timeLeft.seconds} unit="Sec" />
            </div>
        </div>
    );
};

export default CountdownTimer;
