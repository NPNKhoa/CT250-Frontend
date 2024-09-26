import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ targetDate, label }) => {
  const [loading, setLoading] = useState(true);

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-16'>
        <div className='w-8 h-8 border-4 border-blue-400 border-dotted rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-20 bg-gradient-to-r from-red-400 to-yellow-300 rounded-lg shadow-lg px-8 py-2 mb-5'>
      {/* Text bên trái */}
      <p className='text-white text-2xl uppercase font-bold'>{label}</p>

      {/* Đồng hồ đếm ngược bên phải */}
      <div className='flex space-x-4'>
        <TimeUnit value={timeLeft.days} label='Ngày' />
        <TimeUnit value={timeLeft.hours} label='Giờ' />
        <TimeUnit value={timeLeft.minutes} label='Phút' />
        <TimeUnit value={timeLeft.seconds} label='Giây' />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const TimeUnit = ({ value, label }) => (
  <div className='flex flex-col items-center bg-white p-2 rounded-lg shadow-md'>
    <p className='text-2xl font-bold text-gray-800'>
      {String(value).padStart(2, '0')}
    </p>
    <p className='text-xs text-gray-500'>{label}</p>
  </div>
);

export default CountdownTimer;
