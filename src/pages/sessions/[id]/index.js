import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Student from '@/components/Join/Student';
import Teacher from '@/components/Join/Teacher';
import { db, database } from '@/utils/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where, set,setDoc  } from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';
import { FaUsers } from "react-icons/fa6";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

const SessionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const session = useSelector((state) => state.sessions.find((s) => s.code === id));
  const isHost = useSelector((state) => state.isHost);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const guestId = useSelector((state) => state.guestId);

  const participantsCollection = collection(db, `sessions/${id}/participants`);
  const connectedUsersRef = ref(database, 'connectedUsers/' + id);
  const updateConnectedUsers = async () => {
    try {
     
      const currentTimestamp = new Date();
  
     
      const participantDocs = await getDocs(participantsCollection);
      setConnectedUsers(participantDocs.size);

      participantDocs.forEach(async (participantDoc) => {
        const participantData = participantDoc.data();
 
       
        const participantTimestamp = new Date(participantData.timestamp);
        const timeDifferenceInSeconds = (currentTimestamp - participantTimestamp) / 1000;
  
        if (timeDifferenceInSeconds > 31) {
  
          removeParticipant(participantData.participantId);
        }
      });
    } catch (error) {
      console.error('Error updating connected users:', error);
    }
  };
  const removeParticipantsWithoutId = async () => {
    try {
  
      const allParticipantsSnapshot = await getDocs(participantsCollection);
      const participantsWithoutId = allParticipantsSnapshot.docs.filter(doc => !doc.data().participantId);
      if (participantsWithoutId.length > 0) {
        participantsWithoutId.forEach(async (participantDoc) => {
          await deleteDoc(participantDoc.ref);
        });
  
      } else {
        console.log('No participants without participantId found.');
      }
    } catch (error) {
      console.error('Error removing participants without participantId:', error);
    }
  };
  const removeParticipant = async (participantId) => {
    try {
      
      const emptyQuerySnapshot = await getDocs(query(participantsCollection, where('participantId', '==', null)));
  
      if (emptyQuerySnapshot.size > 0) {
        emptyQuerySnapshot.forEach(async (participantDoc) => {
          await deleteDoc(participantDoc.ref);
        });
  
      } else {
        console.log('No participants without participantId found.');
      }
  
      if (participantId) {
        
  
        const querySnapshot = await getDocs(query(participantsCollection, where('participantId', '==', participantId)));
  
        if (querySnapshot.size > 0) {
          const participantDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(participantDocRef);
        
        } else {
          console.log('Participant not found.');
        }
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  };
  
  const addParticipant = async (participantId) => {
    try {
 
      const participantQuerySnapshot = await getDocs(query(participantsCollection, where('participantId', '==', participantId)));
  
      if (participantQuerySnapshot.size > 0) {

        const participantDocRef = participantQuerySnapshot.docs[0].ref;
        await setDoc(participantDocRef, {timestamp: new Date().toISOString() }, { merge: true });
      } else {
    
        await addDoc(participantsCollection, { participantId, timestamp: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Error adding/updating participant:', error);
    }
  };
  

  useEffect(() => {
    const handleSnapshot = (snapshot) => {
      const numConnectedUsers = snapshot.val();
      setConnectedUsers(numConnectedUsers);
    };

    onValue(connectedUsersRef, handleSnapshot);

   
    const cleanup = () => {
      off(connectedUsersRef, 'value', handleSnapshot);

    };

    return cleanup;
  }, [id]);
  const currentUserId = guestId

  useInterval(() => {
    updateConnectedUsers();
    addParticipant(currentUserId);
     removeParticipantsWithoutId();
  }, 30000);

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col  mx-10 justify-center ">
      <div className='flex flex-col justify-center items-center' >
    <h1 className='font-bold text-2xl -mt-10'>{session.name}</h1>
    <p className='font-semibold text-lg mb-2 max-w-[300px] break-words'>{session.description}</p>
    <p className="font-semibold text-lg flex gap-3"> 
    <div className='text-green-600 text-3xl mb-2'>
      <FaUsers /> 
      </div>
      {connectedUsers} Users connected </p>
    </div> 
    {isHost ? <div>
   
    <div>
      <Teacher />
    </div>
    </div>
    : <div>
   <Student />
     </div> }
    </div> 
  );
};

export default SessionPage;
