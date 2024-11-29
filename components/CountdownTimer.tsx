'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, eventName }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="relative bg-brand-dark py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 to-brand-teal/20" />
        <div className="h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(212,175,55,0.1),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Event Details */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gold mb-6">
            {eventName}
          </h2>
          <div className="inline-flex items-center justify-center space-x-2 text-xl text-gray-300">
            <span>FRIDAY, DECEMBER 13TH 2024.</span>
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span>UNIVERSITY OF ABUJA, MAIN CAMPUS, GWAGWALADA.</span>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: timeLeft.days, label: 'D' },
            { value: timeLeft.hours, label: 'H' },
            { value: timeLeft.minutes, label: 'M' },
            { value: timeLeft.seconds, label: 'S' }
          ].map(({ value, label }) => (
            <div key={label} className="relative group">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-brand-gold/20 p-6 md:p-8 transition-all duration-300 group-hover:border-brand-gold/40">
                <div className="relative">
                  <div className="text-5xl md:text-7xl font-bold text-white mb-2 font-mono tracking-wider tabular-nums">
                    {formatNumber(value)}
                  </div>
                  <div className="absolute -right-2 -top-2 text-brand-gold text-xl md:text-2xl font-bold">
                    {label}
                  </div>
                </div>
              </div>
              {/* Reflection Effect */}
              <div className="absolute inset-x-0 h-1/2 bottom-0 bg-gradient-to-b from-transparent to-brand-gold/5 rounded-b-lg" />
            </div>
          ))}
        </div>

        {/* Supporting Text */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Join us for an unforgettable night of worship and divine encounter
          </p>
        </div>
      </div>
    </div>
  );
}