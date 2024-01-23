import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Student from '@/components/Join/Student';
import Teacher from '@/components/Join/Teacher';

const SessionPage = () => {
const router = useRouter();
const { id } = router.query;

const session = useSelector((state) => state.sessions.find((s) => s.code === id));
const isHost  = useSelector((state) => state.isHost); 


if (!session) {
  
    return <div>Session not found</div>;
}

return (
    <div className="min-h-screen flex flex-col md:flex-row mx-10 justify-center ">
      <div className='flex flex-col justify-center items-center' >
    <h1 className='font-bold text-2xl -mt-10'>{session.name}</h1>
    <p className='font-semibold text-lg mb-5 max-w-[300px] break-words'>{session.description}</p>
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
  
    )};

export default SessionPage;