import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinSession } from '@/redux/appSlice';
import { useRouter } from 'next/router'; 
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Join = () => {
  const { t } = useTranslation('join');

  const dispatch = useDispatch();
  const router = useRouter(); 
  
  const [sessionInfo, setSessionInfo] = useState({
    code: '',
  });

  const handleJoinSession = async () => {
    try {
   
      const resultAction = await dispatch(joinSession(sessionInfo));

      if (joinSession.fulfilled.match(resultAction)) {
      
        const joinedSession = resultAction.payload;

        

        router.push(`/sessions/${joinedSession.code}`); 

   
      } else {

        const errorMessage = resultAction.payload;
        console.error('Error joining session:', errorMessage);

     
      }
    } catch (error) {
      console.error('Error joining session:', error.message);
    }
  };

  return (


      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center -mt-20 md:mt-0">
      <div className=" flex flex-col gap-2 mb-10">
      <div className='flex md:ml-30 items-center justify-center mb-6'>
          <img className='w-80' src="/join.svg" alt="join" />
        </div>
      <label>
      {t('sessionCodePlaceholder')}:
        <input
          type="text"
          placeholder='CVCVC'
          className='block w-full mt-2 p-2 border rounded-md'
          value={sessionInfo.code}
          onChange={(e) => setSessionInfo({ ...sessionInfo, code: e.target.value })}
        />
      </label>
      <button
       className=" bg-[#01A1E4] hover:border-[#01A1E4] text-white px-4 py-3 rounded-md   "
       onClick={handleJoinSession}>{t('joinButtonLabel')}</button>
     
  
      </div>
    </div>

    
  );
};

export default Join;


export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ["join"])),
      },
  };
}