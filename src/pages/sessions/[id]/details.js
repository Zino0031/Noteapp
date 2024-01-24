import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, getDocs,onSnapshot  } from 'firebase/firestore';
import { FaUsers } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '@/redux/appSlice'; 


const details = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const session = useSelector((state) => state.sessions.find((s) => s.code === id));
  const isHost = useSelector((state) => state.isHost);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const participantsCollection = collection(db, `sessions/${id}/participants`);

  const messages = useSelector((state) => state.messages); 
 


  useEffect(() => {
    const messagesCollection = collection(db, `sessions/${id}/messages`);
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      newMessages.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
  
      const typeCounters = {};
  
      newMessages.forEach((message) => {
        const messageType = message.type || message.action;
  
        if (typeCounters.hasOwnProperty(messageType)) {
          typeCounters[messageType] += message.counter || 1;
        } else {
          typeCounters[messageType] = message.counter || 1;
        }
      });
  
      const mergedMessages = Object.keys(typeCounters).map((type) => ({
        type,
        counter: typeCounters[type],
      }));
  
      dispatch(setMessages(mergedMessages));
    });
  
    return () => unsubscribe();
  }, [id, dispatch]);
  
  const updateConnectedUsers = async () => {
    try { 
      const participantDocs = await getDocs(participantsCollection);
      setConnectedUsers(participantDocs.size);
    } catch (error) {
      console.error('Error updating connected users:', error);
    }
  };

 
  updateConnectedUsers();


  const uniqueTypes = ['Question',"I'm Lost", 'Aha!', 'Reference', 'Comment'];

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col  mx-10 justify-center ">
      <div className='flex flex-col justify-center items-center' >
      <div className='flex  items-center justify-center mb-2'>
          <img className='w-60' src="/end.svg" alt="end" />
        </div>
    <h1 className='font-bold text-2xl '>{session.name}</h1>
    <p className='font-semibold text-lg mb-2 max-w-[300px] break-words'>{session.description}</p>
    <p className="font-semibold text-lg flex gap-3"> 
    <div className='text-gray-500 text-3xl'>
      <FaUsers /> 
      </div>
      {connectedUsers} Users Participated </p>
 
    <table className="table-auto mt-2 ">
          <thead>
            <tr className='bg-gray-400 '>
              <th className="border border-black px-10 text-center py-2 font-bold">Type</th>
              <th className="border border-black px-10 text-center py-2 font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {uniqueTypes.map((type) => (
              <tr key={type}>
                <td className="border border-black px-10 text-center py-2 font-semibold">{type}</td>
                <td className="border border-black px-10 text-center py-2">
                  {messages.find((message) => message.type === type || message.action === type)?.counter || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
    <button
      className="bg-[#01A1E4] hover:border-[#01A1E4] text-white px-20 py-3 rounded-md"
    >
      More Details 
    </button>
  </div>
            </div> 
      </div>

    

  );
};

export default details;
