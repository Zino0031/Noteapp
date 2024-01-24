import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '@/redux/appSlice'; 
import { collection, onSnapshot } from 'firebase/firestore'; 
import { db } from '@/utils/firebase';


const Teacher = () => {
const router = useRouter();
const dispatch = useDispatch();
const { id } = router.query;


const messages = useSelector((state) => state.messages); 
 

const endSessionHandler = () => {
  router.push(`/sessions/${id}/details`);
};

useEffect(() => {
    const messagesCollection = collection(db, `sessions/${id}/messages`);
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        newMessages.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);

        dispatch(setMessages(newMessages));
    });

    return () => unsubscribe();
}, [id, dispatch]);

return (
  <div className='flex flex-col justify-center overflow-y-hidden max-h-[450px]'>
  <div className="relative overflow-y-auto hide">
  <div className="absolute h-screen left-4 border-l border-black border-4 "></div>
  {messages.map((message) => (
    <div key={message.id} className="relative pl-10 mt-2">
      <div className="absolute top-0 left-0 mt-1 ">
        <p className="bg-white text-[#01A1E4] font-bold">
        {typeof message.temp === 'string' ? message.temp.slice(0, 5) : new Date(message.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

        </p>
      </div>
      <div className="ml-4 font-bold text-xl ">
        {message.type || message.action} 
      </div>
      <div className='text-gray-500 ml-5 mt-1'>
      {message.text ? message.text : `clicked ${message.counter} times under one minute`}
      </div>
    </div>
  ))}

</div>
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
    <button
    onClick={endSessionHandler}
      className="bg-[#01A1E4] hover:border-[#01A1E4] text-white px-20 py-3 rounded-md"
    >
      End Session
    </button>
  </div>
 
  </div>

    )
}

export default Teacher;