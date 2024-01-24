import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { HosturSession } from '@/redux/appSlice';
import { useRouter } from 'next/router';

const Hostinfo = () => {
  const sessions = useSelector((state) => state.sessions);
  const selectedSessionId = sessions.length > 0 ? sessions[sessions.length - 1].sessionId : null;

  const selectedSession = sessions.find((session) => session.sessionId === selectedSessionId);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleHostSession = async () => {
    try {
        const resultAction = await dispatch(HosturSession(selectedSession));
      
    if (HosturSession.fulfilled.match(resultAction)) {
        const hostedSession = resultAction.payload;
        console.log('User joined session:', hostedSession);
        router.push(`/sessions/${hostedSession.code}`);
      } else {
          const errorMessage = resultAction.payload;
          console.log(resultAction);
      console.error('Error joining session:', errorMessage);
    }
  } catch (error) {
    console.error('Error joining session:', error.message);
  }
};

  return (
      
    <div className="text-2xl max-w-md mx-auto mt-8 p-6 flex flex-col items-center justify-center">
          <div className='flex md:ml-30 items-center justify-center mb-6'>
          <img className='w-80' src="/host.svg" alt="host" />
        </div>
      <h1 className="font-bold">{selectedSession.name}</h1>
      <p className="font-semibold mt-2  max-w-[500px] break-words">{selectedSession.description}</p>
      <div className='text-start'>
      <p className="text-green-500 mt-4 mb-4">Your session has been created</p>
      <p className="mt-2">Join with Code: {selectedSession.code}</p>
      <p className="mt-2 mb-4">Host with Pin: {selectedSession.pin}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2 justify-end">
          <button
            onClick={handleHostSession}
            className="p-2 bg-[#01A1E4] text-white rounded-md cursor-pointer hover:bg-[#1184b6]"
          >
          Host Now
          </button>
          <Link
            href='/'
            className="p-2 px-5 font-semibold border-2 border-[#01A1E4] text-[#01A1E4] rounded-md cursor-pointer hover:text-white hover:bg-[#1184b6]"
          >
           Save for Later
          </Link>
        </div>
    </div>
  );
};

export default Hostinfo;
