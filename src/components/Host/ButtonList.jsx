import React from 'react';
import SelectButton from '../SelectButton';

const ButtonList = ({ selectedButtonList, handleButtonClick }) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <SelectButton
        action="Question"
        onClick={() => handleButtonClick('Question')}
        disabled={selectedButtonList === 'standardButtons'}
        className={`mr-2 ${selectedButtonList === 'standardButtons' ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <SelectButton
        action={`I'm lost`}
        onClick={() => handleButtonClick(`I'm lost`)}
        disabled={selectedButtonList === 'standardButtons'}
        className={`mr-2 ${selectedButtonList === 'standardButtons' ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <SelectButton
        action="Aha!"
        onClick={() => handleButtonClick('Aha!')}
        disabled={selectedButtonList === 'standardButtons'}
        className={`mr-2 ${selectedButtonList === 'standardButtons' ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <SelectButton
        action="Reference"
        onClick={() => handleButtonClick('Reference')}
        disabled={selectedButtonList === 'standardButtons'}
        className={`mr-2 ${selectedButtonList === 'standardButtons' ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <SelectButton
        action="Comment"
        onClick={() => handleButtonClick('Comment')}
        disabled={selectedButtonList === 'standardButtons'}
        className={`${selectedButtonList === 'standardButtons' ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};

export default ButtonList;
