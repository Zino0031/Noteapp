import { useState, useEffect } from 'react';

const Timer = ({ onSelectedTimeChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [sliderValue, setSliderValue] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSliderChange = (event) => {
    const minutesAgo = parseInt(event.target.value, 10);
    const newSelectedTime = new Date(currentTime.getTime() - (60 - minutesAgo) * 60000);
    setSelectedTime(newSelectedTime);
    setSliderValue(minutesAgo);
    onSelectedTimeChange(newSelectedTime.toLocaleTimeString());
  };

  const handleAddMinute = () => {
    const newSelectedTime = new Date(selectedTime.getTime() - 60000);
    setSelectedTime(newSelectedTime);
    setSliderValue((60 - (currentTime - newSelectedTime) / 60000));
    onSelectedTimeChange(newSelectedTime.toLocaleTimeString());
  };

  const handleAddFiveMinutes = () => {
    const newSelectedTime = new Date(selectedTime.getTime() - 300000);
    setSelectedTime(newSelectedTime);
    setSliderValue((60 - (currentTime - newSelectedTime) / 60000));
    onSelectedTimeChange(newSelectedTime.toLocaleTimeString());
  };

  return (
    <div className='flex  flex-col items-center justify-center'>
      
      <label>
        <input
          type="range"
          value={sliderValue}
          min={0}
          max={60}
          step={1}
          onChange={handleSliderChange}
          className=' w-80 '
        />
      </label>
      <br />
      <p className='font-bold text-xl -mt-5'> {selectedTime.toLocaleTimeString()}</p>
      <div className='flex gap-4'>
      <button onClick={handleAddMinute}> 1 Min ago</button>
      <button onClick={handleAddFiveMinutes}> 5 Min ago</button>
      </div>
    </div>
  );
};

export default Timer;
