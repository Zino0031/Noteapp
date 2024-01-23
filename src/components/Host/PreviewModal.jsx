import React from 'react';
import SelectButton from '../SelectButton';

const PreviewModal = ({ previewData, handleEditSession, handleConfirmCreate }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-16 rounded-md shadow-md flex flex-col justify-center items-center">
        <div className='flex flex-col justify-center items-center' >
          <p className='font-bold text-2xl -mt-10'>
             {previewData.name}
          </p>
          <p className='font-semibold text-lg mb-5 max-w-[300px] break-words'>
            {previewData.description}
          </p>
          <p>
            
            <div className="flex flex-col gap-2">
              {previewData.selectedButtons.map((btn, index) => (
                <SelectButton key={index} action={btn} disabled={true} />
              ))}
            </div>
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEditSession}
            className="mr-4 p-2 px-5 font-semibold bg-gray-300  rounded-md cursor-pointer hover:bg-gray-400"
          >
            Edit
          </button>
          <button
            onClick={handleConfirmCreate}
            className="p-2 bg-[#01A1E4] text-white rounded-md cursor-pointer hover:bg-[#1184b6]"
          >
           Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
