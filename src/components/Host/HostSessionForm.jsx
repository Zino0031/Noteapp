import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HostSession } from '@/redux/appSlice';
import { useRouter } from 'next/router'; 

const HostSessionForm = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  
  const [sessionInfo, setSessionInfo] = useState({
    code: '',
    pin: '',
  });

  const handleHostSession = async () => {
    try {
      const resultAction = await dispatch(HostSession(sessionInfo));

      if (HostSession.fulfilled.match(resultAction)) {
        const HostSession = resultAction.payload;
        console.log('User joined session:', HostSession);
        router.push(`/sessions/${HostSession.code}`); 
      } else {
        const errorMessage = resultAction.payload;
        console.error('Error joining session:', errorMessage);
      }
    } catch (error) {
      console.error('Error joining session:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end ">
      <div className=" flex flex-col gap-2 mb-10">
        <label className="mb-2">
          <input
            type="text"
            placeholder='Code'
            value={sessionInfo.code}
            onChange={(e) => setSessionInfo({ ...sessionInfo, code: e.target.value })}
            className="block w-full mt-2 p-2 border rounded-md"
          />
        </label>
        <div className='flex justify-center items-center gap-2'>

        <label className="mb-2">
     
          <input
            type="text"
            value={sessionInfo.pin}
            placeholder='Pin'
            onChange={(e) => setSessionInfo({ ...sessionInfo, pin: e.target.value })}
            className="block w-full mt-2 p-2 border rounded-md"
          />
        </label>
        <button
          onClick={handleHostSession}
          className=" bg-[#01A1E4] hover:border-[#01A1E4] text-white px-4 py-3 rounded-md   "
        >
         Host
        </button>
            </div>
      </div>
    </div>
  );
};

export default HostSessionForm;
