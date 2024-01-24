import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HosturSession } from '@/redux/appSlice';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const HostYourSession = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation('host');

  const [sessionInfo, setSessionInfo] = useState({
    code: '',
  });
  

  const sessions = useSelector((state) => state.sessions);
  const handleHostSession = async () => {
      try {
          const resultAction = await dispatch(HosturSession(sessionInfo));
        

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
    <div className="flex flex-col items-center justify-end ">
      <div className="flex flex-col gap-2 mb-10">
        <label className="mb-2">
          <select
            value={sessionInfo.sessionId}
            onChange={(e) => setSessionInfo({ ...sessionInfo, code: e.target.value })}
            className="block w-60 mt-2 p-2 border rounded-md"
          >
            <option value="">{t('selectSession')}</option>
            {sessions.map((session) => (
              <option key={session.sessionId} value={session.code}>
                {session.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-center  gap-2">
          <button
            onClick={handleHostSession}
            className=" bg-[#01A1E4] hover:border-[#01A1E4] text-white px-10 py-3 rounded-md"
          >
            {t('hostButtonLabel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostYourSession;
