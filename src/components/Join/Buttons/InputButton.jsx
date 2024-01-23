import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TimeSlider from '@/components/Join/Buttons/TimeSlider'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '@/utils/firebase';

const InputButton = ({type}) => {

        const router = useRouter();
        const { id } = router.query;
        const [newMessage, setNewMessage] = useState('');
        const [showSend, setshowSend] = useState(false);
        const [SelectedTime, setSelectedTime] = useState(new Date());


    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
        return; 
        }

        try {
   
        const messagesCollection = collection(db, `sessions/${id}/messages`);
        await addDoc(messagesCollection, {
            text: newMessage,
            type: type,
            sender: 'Guest', 
            temp:SelectedTime,
            timestamp: serverTimestamp(),
            counter: 1,
        });

        
        setNewMessage('');
        } catch (error) {
        console.error('Error sending message:', error.message);
        }
    };
       

    const handleButtonClick = async () => {
      setshowSend(true);
    };
    const handleClose = async () => {
      setshowSend(false);
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
        {type}
      </button>

      {showSend && (
         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white p-10 px-16 rounded-md shadow-md flex flex-col justify-center items-center">
         <h1 className='font-bold text-3xl mb-6 '>{type}</h1>
         <textarea
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className='block w-full mt-1 p-2 border rounded-md '
        />
         <TimeSlider onSelectedTimeChange={handleSelectedTimeChange} />
        
         <div className='flex gap-3 mt-4'>       
        <button
            onClick={handleClose}
            className="p-2 px-5 font-semibold bg-gray-300  rounded-md cursor-pointer hover:bg-gray-400"
          >
            Cancel
          </button>
          <button className="py-2 px-6  bg-[#01A1E4] border-[#01A1E4] border-2 text-white rounded-md"
 onClick={handleSendMessage}>Send</button>
          </div>
        </div>
        </div>
      )}
                        
                      
    </div>
  )
}

export default InputButton