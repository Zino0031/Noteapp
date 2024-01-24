import React, { useState } from 'react';

const SelectButton = ({ action, onClick, disabled }) => {
  const [selected, setSelected] = useState(false);

  const handleButtonClick = () => {
    if (!disabled) {
      setSelected(!selected);
      onClick(action); 
    }
  };

  return (
    <div>
   <button
  onClick={handleButtonClick}
  disabled={disabled}
  className={`py-2 px-4 w-60 ${selected ? 'bg-[#01A1E4] border-[#01A1E4] border-2 text-white' : 'border-gray-500 border-2 text-gray-500'} rounded-md cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#01A1E4] hover:text-white hover:border-[#01A1E4]'}`}
>
  {action}
</button>

    </div>
  );
};

export default SelectButton;
