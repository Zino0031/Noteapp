import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { incrementCounter, sendMessage } from '@/redux/appSlice';
import { useRouter } from 'next/router';
import { db } from '@/utils/firebase';
import TimeSlider from '@/components/Join/Buttons/TimeSlider'

const ActionButton = ({ action }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [SelectedTime, setSelectedTime] = useState(new Date());

  const [showsend, setshowsend] = useState(false);

  const handleActionClick = async () => {
    try {
      const messagesCollection = collection(db, `sessions/${id}/messages`);

      const oneMinuteAgo = new Date();
      oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);
      const currentTimestamp = new Date().getTime();
      const querySnapshot = await getDocs(
        query(messagesCollection, where('action', '==', action, 'timestamp', '>', oneMinuteAgo), orderBy('timestamp', 'desc'))
      );

      if (querySnapshot.size > 0 && querySnapshot.docs[0].data().timestamp.toMillis() > currentTimestamp - 60000) {
        const latestMessageDoc = querySnapshot.docs[0];
        await updateDoc(doc(messagesCollection, latestMessageDoc.id), {
          counter: latestMessageDoc.data().counter + 1,
        });
        dispatch(incrementCounter({ sessionId: id }));
      } else {
        await addDoc(messagesCollection, {
          action,
          sender: 'Guest',
          timestamp: serverTimestamp(),
          counter: 1,
          temp:SelectedTime.toLocaleTimeString(),
        });
        dispatch(incrementCounter({ sessionId: id }));
               
      }
    } catch (error) {
      console.error('Error handling Aha! button click:', error.message);
    }
  };

  const handleButtonClick = async () => {
    setshowsend(true);
  };
  const handleClose = async () => {
    setshowsend(false);
  };
  const handleSelectedTimeChange = (newSelectedTime) => {
    setSelectedTime(newSelectedTime);
  };
  return (
    <div>
      <button
        className={`py-2 px-4 w-60 bg-[#01A1E4] border-[#01A1E4] border-2 text-white rounded-md`}
        onClick={handleButtonClick}
      >
        {action}
      </button>

      {showsend && (
         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white p-10 px-16 rounded-md shadow-md flex flex-col justify-center items-center">
          <h1 className='font-bold text-3xl mb-6 '>{action}</h1>
         <TimeSlider onSelectedTimeChange={handleSelectedTimeChange} />
         <div className='flex gap-3 mt-4'> 
        <button
            onClick={handleClose}
            className=" p-2 px-5 font-semibold bg-gray-300  rounded-md cursor-pointer hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
          className="py-2 px-6  bg-[#01A1E4] border-[#01A1E4] border-2 text-white rounded-md"
          onClick={handleActionClick}
          > Send
        </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
