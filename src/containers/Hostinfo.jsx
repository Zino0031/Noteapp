import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Hostinfo = () => {
  const sessions = useSelector((state) => state.sessions);
  const selectedSessionId = sessions.length > 0 ? sessions[sessions.length - 1].sessionId : null;

  const selectedSession = sessions.find((session) => session.sessionId === selectedSessionId);

  return (
      
    <div className="text-2xl max-w-md mx-auto mt-8 p-6 flex flex-col items-center justify-center">
      <h1 className="font-bold">{selectedSession.name}</h1>
      <p className="font-semibold mt-2  max-w-[500px] break-words">{selectedSession.description}</p>
      <div className='text-start'>
      <p className="text-green-500 mt-4 mb-4">Your session has been created</p>
      <p className="mt-2">Join with Code: {selectedSession.code}</p>
      <p className="mt-2 mb-4">Host with Pin: {selectedSession.pin}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2 justify-end">
          <button
         
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
